import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import RouteSelectionScreen from './components/editDisplay/EditBus';
import DaysSelectionScreen from './components/editDisplay/EditWeekDay';
import TimeSelectionScreen from './components/editDisplay/EditTime';
import StopSelectionScreen from './components/editDisplay/EditBusStop'

export type RootStackParamList = {
    Profile: undefined;
    RouteSelection: undefined;
    DaySelection: undefined;
    TimeSelection: undefined;
    Stop: undefined;

};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Profile">
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="RouteSelection" component={RouteSelectionScreen} />
                <Stack.Screen name="DaySelection" component= {DaysSelectionScreen}/>
                <Stack.Screen name="TimeSelection" component= {TimeSelectionScreen}/>
                <Stack.Screen name="Stop" component= {StopSelectionScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
