import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import TaskListScreen from './screens/TaskListScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import SettingsScreen from './screens/SettingsScreen';
import MojeKonto from './screens/MojeKonto';

const Tabs = createBottomTabNavigator();

function TabNav({ route }) {
    const { email } = route.params;
    return (
        <Tabs.Navigator>
            <Tabs.Screen name='Moje zadania' component={TaskListScreen} initialParams={{ email }} />
            <Tabs.Screen name='Statystyki' component={StatisticsScreen} />
            <Tabs.Screen name='Ustawienia' component={SettingsScreen} />
            <Tabs.Screen name='Moje konto' component={MojeKonto} />
        </Tabs.Navigator>
    );
}

export default TabNav;