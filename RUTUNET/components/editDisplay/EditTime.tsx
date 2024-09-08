import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';

const TimeSelectionScreen: React.FC = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<string | null>(null);

    const data = [
        { key: '1', value: '5 min', disabled: false },
        { key: '2', value: '10 min', disabled: false },
        { key: '3', value: '15 min', disabled: false },
        { key: '4', value: '20 min', disabled: false }
    ];

    return (
        <View style={styles.container}>
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={data}
                defaultOption={{ key: '', value: 'Seleccione tiempo de espera' }} 
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

export default TimeSelectionScreen;
