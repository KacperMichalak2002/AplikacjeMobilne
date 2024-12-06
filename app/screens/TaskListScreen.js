import React from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { ListItem, Icon, FAB } from 'react-native-elements';
import { useTasks } from '../TaskContext';

function TaskListScreen({ route, navigation }) {
    const { email } = route.params || {};
    const { tasks: list, deleteTask, addTask } = useTasks();

    const handleTaskPress = (taskId, status) => {
        navigation.navigate('TaskDetails', { taskId, email, status });
    };

    const handleAddTask = () => {
        const newTaskName = `Zadanie ${list.length + 1}`;
        addTask(newTaskName);
        Alert.alert('Dodano nowe zadanie!');
    };

    const handleDeleteTask = taskId => {
        Alert.alert(
            'Potwierdzenie',
            'Czy na pewno chcesz usunąć to zadanie?',
            [
                { text: 'Anuluj', style: 'cancel' },
                {
                    text: 'Usuń',
                    onPress: () => {
                        deleteTask(taskId);
                        Alert.alert('Zadanie zostało usunięte');
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: true }
        );
    };

    const getStatusIcon = status => {
        switch (status) {
            case 'completed':
                return { name: 'check-circle', color: 'green' };
            case 'inProgress':
                return { name: 'pending', color: 'orange' };
            default:
                return { name: 'help', color: 'red' };
        }
    };

    return (
        <View>
            <ScrollView>
                {list.map((item, i) => (
                    <ListItem
                        key={i}
                        onPress={() => handleTaskPress(item.taskId, item.status)}
                        bottomDivider
                        containerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <ListItem.Content
                            style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                        >
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <Icon
                                name={getStatusIcon(item.status).name}
                                color={getStatusIcon(item.status).color}
                                containerStyle={{ marginLeft: 10 }}
                            />
                            <ListItem.Chevron color='gray' size={20} />
                        </ListItem.Content>
                        <Icon
                            name='delete'
                            color='red'
                            onPress={() => handleDeleteTask(item.taskId)}
                        />
                    </ListItem>
                ))}
            </ScrollView>
            <FAB
                title='+'
                placement='right'
                color='#0096FF'
                onPress={handleAddTask}
                style={{
                    position: 'absolute',
                    bottom: -70,
                    right: 10
                }}
            />
        </View>
    );
}

export default TaskListScreen;
