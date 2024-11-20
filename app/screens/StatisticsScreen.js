import React from 'react';
import { View, Text } from 'react-native';

function StatisticsScreen({ route }) {
    const { dateRange } = route.params || {};
    return (
        <View>
            <Text>Statystyki</Text>
            <Text>Filtruj według dat: {dateRange || 'Nie wybrano'}</Text>
        </View>
    );
}

export default StatisticsScreen;
