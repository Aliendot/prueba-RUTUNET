import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Header from '../components/Header';
import UserDisplay, { UserDisplayWeek } from '../components/UserDisplay';
import supabase from '../supabase/supabase.service';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [routeName, setRouteName] = useState<string>("19 de abril");
    const [stopName, setStopName] = useState<string>("Parada ...")
    const [waitingTime, setWaitingTime] = useState<number | null>(null);
    const [morningDays, setMorningDays] = useState<boolean[]>([false, false, false, false, false]);
    const [afternoonDays, setAfternoonDays] = useState<boolean[]>([false, false, false, false, false]);


    useEffect(() => {
        const fetchData = async () => {
            const userId = "e9ddd8e0-fab5-461e-8100-0dd67b21fe8b"; // ID del usuario
            type BusData ={
                buses: {bus_name: string}
            }
            type StopData={
                bus_stops: {stop_name: string}
            }
            type ProfileData = {
                bus_stop_id: number | null; 
              };
            type TimeData = {
                timeData: number | null
            }

            // Consulta a la tabla profile_bus y buses
            const { data, error } = await supabase
                .from('profile_bus')
                .select(`
                    buses (bus_name)
                `)
                .eq('id_profile', userId)
                .maybeSingle<BusData>();
            
            if (error) {
                console.error('Error al obtener la ruta: ', error.message);
                setRouteName('Error al cargar la ruta');
            } else if (data) {
                console.log(data) ////// 
                setRouteName(data.buses.bus_name); // Actualiza 
            }else{setRouteName('Ruta no encontrada')}

            // - busqueda de parada
            const { data: stopData, error:stopError } = await supabase
                .from('profiles')
                .select('bus_stop_id')
                .eq('id',userId)
                .maybeSingle<ProfileData>();
            

            if(stopError){
                console.error('error al obtener parada: ', stopError)
                setStopName('Error al cargar')
            }else if(stopData?.bus_stop_id){
                //setStopName(stopData.bus_stops.stop_name)
                const { data:busStopData, error: errorBusStop } = await supabase
                    .from('bus_stops')
                    .select('stop_name')
                    .eq('id', stopData.bus_stop_id)
                    .maybeSingle() 
                if (errorBusStop) {
                    console.error('Error al obtener el nombre de la parada: ', errorBusStop.message);
                    setStopName('Error al cargar la parada');
                } else if (busStopData) {
                    setStopName(busStopData.stop_name); 
                } else {
                    setStopName('Parada no seleccionada');
                }
            }else{
                setStopName('Parada no seleccionada')
            }

            // obtener tiempo
            const { data: timeData, error: timeError } = await supabase
                .from('profiles')
                .select('waiting_time')
                .eq('id', userId)
                .maybeSingle();

            if (timeError) {
                console.error('Error al obtener el tiempo de espera: ', timeError);
                setWaitingTime(null); 
            } else {
                if (timeData && timeData.waiting_time !== undefined) {
                    setWaitingTime(timeData.waiting_time);
                } else {
                    setWaitingTime(5); 
                }
            }

            // Obtener días (morning) seleccionados
            const { data: daysData, error: daysError } = await supabase
                .from('profile_days')
                .select('days_id')
                .eq('profile_id', userId);

            if (daysError) {
                console.error('Error al obtener los días seleccionados: ', daysError.message);
            } else {
                console.log(daysData)
                const selectedDays = daysData.map(day => day.days_id);
                const daysArray = [1, 2, 3, 4, 5]; // Índices para LUN, MAR, MIE, JUE, VIE
                const morningDaysBool = daysArray.map(day => selectedDays.includes(day));
                setMorningDays(morningDaysBool);
                setAfternoonDays(morningDaysBool); // Si es lo mismo para mañana y tarde
            }

            // Obtener días (afternoon) seleccionados
            const { data: daysAfternoon, error: afternoonError } = await supabase
                .from('profile_afternoon')
                .select('days_id')
                .eq('profile_id', userId);

            if (afternoonError) {
                console.error('Error al obtener los días seleccionados: ', afternoonError.message);
            } else {
                console.log(daysAfternoon)
                const selectedDays = daysAfternoon.map(day => day.days_id);
                const daysArray = [1, 2, 3, 4, 5]; // Índices para LUN, MAR, MIE, JUE, VIE
                const morningDaysBool = daysArray.map(day => selectedDays.includes(day));
                setAfternoonDays(morningDaysBool); // 
            }

        };

        fetchData();
    }, []);

    // Funciones para editar información
    const editRouteInfo = () => { navigation.navigate('RouteSelection'); };
    const editStopInfo = () => { navigation.navigate('Stop'); };
    const editTimeInfo = () => { navigation.navigate('TimeSelection'); };
    const editWeekInfo = () => { navigation.navigate('DaySelection'); };
    const editWeekAfternoonInfo = () => { navigation.navigate('AfternoonSelection'); };

    return (
        <View style={styles.container}>
            <Header />
            <UserDisplay
                icon={require('../assets/icons/bus.png')}
                displayName="Ruta"
                displayText={routeName} // Muestra la ruta seleccionada
                editInfo={editRouteInfo}
                style={styles.borderBlue}
            />
            <UserDisplay
                icon={require('../assets/icons/gps_pin.png')}
                displayName="Tu Parada"
                displayText={stopName} // Muestra parada seleccionada
                editInfo={editStopInfo}
                style={styles.borderBlue}
            />
            <UserDisplay
                icon={require('../assets/icons/clock.png')}
                displayName="Notificar cuando falten"
                displayText={waitingTime+' min'} // tiempo de espera
                editInfo={editTimeInfo}
                style={styles.borderBlue} 
            />
            <UserDisplayWeek
                displayName="Días de uso en la mañana"
                displayText={["LUN", "MAR", "MIE", "JUE", "VIE"]}
                dayBool={morningDays} // dias que selecciono 
                editInfo={editWeekInfo}
            />
            <UserDisplayWeek
                displayName="Días de uso en la tarde"
                displayText={["LUN", "MAR", "MIE", "JUE", "VIE"]}
                dayBool={afternoonDays} // dias en la tarde
                editInfo={editWeekAfternoonInfo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edf3fc',
        padding: 20,
        alignItems: 'center',
    },
    borderBlue: {
        borderWidth: 2,
        borderColor: 'blue',
    },
});

export default ProfileScreen;
