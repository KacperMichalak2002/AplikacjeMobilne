import React from 'react';
import { View, Text, Button } from 'react-native';

function TaskListScreen({ route, navigation }) {
    const { email } = route.params || {};
    const handleTaskPress = taskId => {
        navigation.navigate('TaskDetails', { taskId, email });
    };

    return (
        <View>
            <Text>Lista zadań</Text>
            <Text>Witaj, {email}</Text>
            <Button title='Otwórz zadanie 1' onPress={() => handleTaskPress(1)} />
            <Button title='Otwórz zadanie 2' onPress={() => handleTaskPress(2)} />
        </View>
    );
}

export default TaskListScreen;
