import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Switch } from 'react-native-elements';
import { useTasks } from '../TaskContext';

function TaskDetailsScreen({ route, navigation }) {
    const { taskId, status: initialStatus } = route.params || {};
    const [status, setStatus] = useState(initialStatus);

    const { updateTaskStatus } = useTasks();

    const toggleSwitch = () => {
        const newStatus = status === 'completed' ? 'inProgress' : 'completed';
        setStatus(newStatus);
        updateTaskStatus(taskId, newStatus);
    };

    return (
        <View>
            <Text>Szczegóły zadania</Text>
            <Text>ID zadania: {taskId}</Text>
            <Text>Progress zadania: {status}</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={status === 'completed' ? '#2596be' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={status === 'completed'}
            />
            <Button title='Powrót do listy zadań' onPress={() => navigation.goBack()} />
        </View>
    );
}

export default TaskDetailsScreen;
