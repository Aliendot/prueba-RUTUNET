import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import Header from '../components/Header';
import UserDisplay, { UserDisplayWeek } from '../components/UserDisplay';
import supabase from '../supabase/supabase.service';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // Estado para almacenar el nombre de la ruta seleccionada
    const [routeName, setRouteName] = useState<string>("Ruta ...");

    useEffect(() => {
        const fetchRouteData = async () => {
            const userId = "e9ddd8e0-fab5-461e-8100-0dd67b21fe8b"; // ID del usuario
            type BusData ={
                buses: {
                    bus_name: string
                }
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
                //console.error(data)
                console.log(data) ////// 
                setRouteName(data.buses.bus_name); // Actualiza 
            }else{
                setRouteName('ruta no encontrada')
            }
        };

        fetchRouteData();
    }, []);

    // Funciones para editar información
    const editRouteInfo = () => { navigation.navigate('RouteSelection'); };
    const editStopInfo = () => { navigation.navigate('Stop'); };
    const editTimeInfo = () => { navigation.navigate('TimeSelection'); };
    const editWeekInfo = () => { navigation.navigate('DaySelection'); };

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
                displayText="Liceo Roman Valecillos"
                editInfo={editStopInfo}
                style={styles.borderBlue}
            />
            <UserDisplay
                icon={require('../assets/icons/clock.png')}
                displayName="Notificar cuando falten"
                displayText="5 min"
                editInfo={editTimeInfo}
                style={styles.borderBlue} 
            />
            <UserDisplayWeek
                displayName="Días de uso en la mañana"
                displayText={["LUN", "MAR", "MIE", "JUE", "VIE"]}
                dayBool={[true, true, true, true, true]}
                editInfo={editWeekInfo}
            />
            <UserDisplayWeek
                displayName="Días de uso en la tarde"
                displayText={["LUN", "MAR", "MIE", "JUE", "VIE"]}
                dayBool={[true, true, true, true, true]}
                editInfo={editWeekInfo}
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
