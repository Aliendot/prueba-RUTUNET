import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../supabase/supabase.service';

const RouteSelectionScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string | null>(null);

    const data = [
        { key: '1', value: '19 Abril' },
        { key: '2', value: 'Tariba' },
        { key: '3', value: 'Av Carabobo' },
        { key: '4', value: 'Colon' },
        { key: '5', value: 'Capacho' },
        { key: '6', value: 'Cordero' }
    ];
/*
    const saveRouteSelection = async () => {
        if (selected) {
            const userId = "e9ddd8e0-fab5-461e-8100-0dd67b21fe8b"; //////
            
            const { data, error } = await supabase
                .from('profile_bus')
                .upsert({ id_profile: userId, id_bus: parseInt(selected) }, { onConflict: 'id_profile' });

            if (error) {
                console.error('Error al guardar la ruta seleccionada:', error.message);
                Alert.alert('Error', 'No se pudo guardar la selección de la ruta.');
            } else {
                console.log('Ruta seleccionada guardada:', data);
                navigation.goBack(); 
            }
        } else {
            Alert.alert('Advertencia', 'Debes seleccionar una ruta.');
        }
    };
*/
const saveRouteSelection = async () => {
    if (selected) {
        const userId = "e9ddd8e0-fab5-461e-8100-0dd67b21fe8b"; // ID del usuario

        // Primero, verifica si el registro existe
        const { data: existingData, error: fetchError } = await supabase
            .from('profile_bus')
            .select('id')
            .eq('id_profile', userId)
            .eq('id_bus', parseInt(selected))
            //.single(); 

        console.log('registros: '+data)
        if (fetchError) {
            console.log('data: '+existingData)
            console.error('Error al verificar la ruta:', fetchError.message);
            Alert.alert('Error', 'No se pudo verificar la selección de la ruta.');
            return;
        }

        let result;

        if (existingData) {
            console.log('entro')
            // Actualiza el registro 
            result = await supabase
                .from('profile_bus')
                .update({ id_bus: parseInt(selected) })
                .eq('id_profile', userId)
                .eq('id_bus', parseInt(selected));
        } else {
            console.log('entro 2')
            // Si el registro no existe se crea uno nuevo
            result = await supabase
                .from('profile_bus')
                .insert({ id_profile: userId, id_bus: parseInt(selected) });
        }

        if (result.error) {
            console.error('Error al guardar la ruta seleccionada:', result.error.message);
            Alert.alert('Error', 'No se pudo guardar la selección de la ruta.');
        } else {
            console.log('Ruta seleccionada guardada:', result.data);
            navigation.goBack(); 
        }
    } else {
        Alert.alert('Advertencia', 'Debes seleccionar una ruta.');
    }
};


    return (
        <View style={styles.container}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                defaultOption={{ key: '', value: 'Seleccione una ruta' }} 
            />
            <Button title="Guardar" onPress={saveRouteSelection} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#edf3fc'
    },
});

export default RouteSelectionScreen;
