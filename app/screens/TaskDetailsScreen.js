import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Switch } from 'react-native-elements';
import { useTasks } from '../TaskContext';

function TaskDetailsScreen({ route, navigation }) {
    const { task } = route.params || {};
    const [status, setStatus] = useState(task.status);

    const {updateTaskStatus } = useTasks();

    const toggleSwitch = () => {
        const newStatus = status === 'Completed' ? 'In Progress' : 'Completed';
        setStatus(newStatus);
        updateTaskStatus(task.id, newStatus);
    };

    return (
        <View>
            <Text>Szczegóły zadania</Text>
            <Text>ID zadania: {task.id}</Text>
            <Text>Progress zadania: {task.status}</Text>
            <Text>Opis: {task.description}</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={status === 'Completed' ? '#2596be' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={status === 'Completed'}
            />
            <Button title='Powrót do listy zadań' onPress={() => navigation.goBack()} />
        </View>
    );
}

export default TaskDetailsScreen;
