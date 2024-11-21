import React from 'react';
import { View, Text, Button } from 'react-native';

function TaskDetailsScreen({ route, navigation }) {
    const { taskId, email, status } = route.params || {};

    return (
        <View>
            <Text>Email {email}</Text>
            <Text>Szczegóły zadania</Text>
            <Text>ID zadania: {taskId}</Text>
            <Text>Progress zadania: {status}</Text>
            <Button title='Powrót do listy zadań' onPress={() => navigation.goBack()} />
        </View>
    );
}

export default TaskDetailsScreen;
