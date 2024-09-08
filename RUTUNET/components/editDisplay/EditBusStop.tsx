import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';

const StopSelectionScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string | null>(null);

    const data = [
        { key: '1', value: 'Redoma Antigua ULA', disabled: false },
        { key: '2', value: 'Alconsa', disabled: false },
        { key: '3', value: 'Banco Sofitasa', disabled: false },
        { key: '4', value: 'Supermercado Cosmo', disabled: false },
        { key: '5', value: 'Lucio Oquendo', disabled: false },
        { key: '6', value: 'Circulo Militar', disabled: false }
    ];

    return (
        <View style={styles.container}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                defaultOption={{ key: '', value: 'Seleccione una ruta' }} 
            />
            
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

export default StopSelectionScreen;
