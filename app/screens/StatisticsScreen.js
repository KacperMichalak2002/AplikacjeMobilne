import React from 'react';
import { View, Text } from 'react-native';
import { useTasks } from '../TaskContext';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

function StatisticsScreen({ route }) {
    const { dateRange } = route.params || {};
    const { tasks: list, setTasks } = useTasks();

    const completedTasks = list.filter(task => task.status === 'completed').length;
    const inProgressTasks = list.filter(task => task.status === 'inProgress').length;

    const totalTasks = list.length;
    const completedPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    const inProgressPercentage = totalTasks ? (inProgressTasks / totalTasks) * 100 : 0;

    const data = [
        {
            name: 'Ukończone',
            population: completedPercentage,
            color: 'green',
            legendFontColor: 'green',
            legendFontSize: 15
        },
        {
            name: 'W toku',
            population: inProgressPercentage,
            color: 'orange',
            legendFontColor: 'orange',
            legendFontSize: 15
        }
    ];

    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={{ padding: 20 }}>
            <Text>Statystyki</Text>
            <Text>Filtruj według dat: {dateRange || 'Nie wybrano'}</Text>
            <Text>Liczba zadań: {totalTasks}</Text>

            <View style={{ marginTop: 20 }}>
                <PieChart
                    data={data}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#f0f0f0',
                        backgroundGradientTo: '#f0f0f0',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    accessor='population'
                    backgroundColor='transparent'
                    paddingLeft='15'
                    center={[10, 10]}
                />
            </View>
        </View>
    );
}

export default StatisticsScreen;
