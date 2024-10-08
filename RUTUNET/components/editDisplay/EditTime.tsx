import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../supabase/supabase.service';

const TimeSelectionScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string | null>(null);
    type Profile={
        id: string;
        sector: string;
        bus_stop_id?: number | null;
        carrer?: string;
        rol?: string;
        waiting_time?: number;
    }
    const data = [
        { key: '5', value: 5, disabled: false },
        { key: '10', value: 10, disabled: false },
        { key: '15', value: 15, disabled: false },
        { key: '20', value: 20, disabled: false }
    ];


    const saveSelection = async()=>{
        if(selected){
            const userId = "e9ddd8e0-fab5-461e-8100-0dd67b21fe8b" // ID usuario

            const {error} = await supabase
                .from('profiles')
                .update({ waiting_time : parseInt(selected) })
                .eq('id',userId)

            if (error) {
                console.error("Error al guardar la selección: ", error.message);
                Alert.alert('Error', 'No se pudo guardar la selección.');
            } else {
                Alert.alert('Éxito', 'Selección guardada correctamente.');
            }
        }else{
            Alert.alert('Advertencia', 'Seleccione una opción antes de guardar.');
        }
    }

    return (
        <View style={styles.container}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                defaultOption={{ key: '', value: 'Seleccione tiempo de espera' }} 
            />
            <Button title="Guardar" onPress={saveSelection} />
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

export default TimeSelectionScreen;
