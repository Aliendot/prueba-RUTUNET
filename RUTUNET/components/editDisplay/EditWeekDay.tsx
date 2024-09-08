/*
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RouteSelectionScreen: React.FC = () => {
    const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);

    const handleRouteSelect = (day: string) => {
        setSelectedRoutes((prevRoutes) =>
            prevRoutes.includes(day)
                ? prevRoutes.filter((r) => r !== day)
                : [...prevRoutes, day]
        );
    };

    return (
        <View style={styles.container}>
            <Text>Select Your Routes</Text>
            <Button title="Palmira" onPress={() => handleRouteSelect('Palmira')} />
            <Button title="Cordero" onPress={() => handleRouteSelect('Cordero')} />
            <Button title="San Cristobal" onPress={() => handleRouteSelect('San Cristobal')} />
            
            <Text>Selected Routes: {selectedRoutes.join(', ')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RouteSelectionScreen;

*/



import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const DaysSelectionScreen: React.FC = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const handleDaySelect = (day: string) => {
        setSelectedDays((prevDay) =>
            prevDay.includes(day)
                ? prevDay.filter((r) => r !== day)
                : [...prevDay, day]
        );
    };

    const [selected, setSelected] = useState<string[]>([]);
    const data = [
        { key: '1', value: 'Lunes', disabled: false },
        { key: '2', value: 'Martes', disabled: false },
        { key: '3', value: 'Miercoles', disabled: false },
        { key: '4', value: 'Jueves', disabled: false },
        { key: '5', value: 'Viernes', disabled: false }
    ];

    return (
        <View style={styles.container}>
            <MultipleSelectList
                setSelected={(val: string[]) => setSelected(val)}
                data={data}
                label = "Dias seleccionados"
                save="key"
                notFoundText='No hay resultados'
                onSelect={()=>console.log(selected)}//////
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

export default DaysSelectionScreen;