import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { ListItem, Icon, FAB } from 'react-native-elements';
import { useState } from 'react';
function TaskListScreen({ route, navigation }) {
    const { email } = route.params || {};
    const handleTaskPress = (taskId,status) => {
        navigation.navigate('TaskDetails', { taskId, email, status});
    };

    const [list, setList] = useState( [
        {
            name: 'Zadanie 1',
            taskId: 1,
            status: 'completed',
        },

        {
            name: 'Zadanie 2',
            taskId: 2,
            status: 'inProgress',
        }
    ]);

    const handleAddTask =() =>{
        const newTask = {
            name :`Zadanie ${list.length + 1}`,
            taskId: list.length + 1,
            status: 'inProgress',
        };

        setList([...list,newTask]);
        Alert.alert("Dodano nowe zadanie!");
        
    }

    const getStatusIcon = status =>{
        switch(status){
            case 'completed':
                return { name: 'check-circle', color: 'green' };
            case 'inProgress':
                return { name: 'pending', color: 'orange' };
            default:
                 return { name: 'help', color: 'red' };
        }
    }

    return (
        <View>
            {
                list.map((item,i)=>(
                    <ListItem
                        key={i}
                        onPress={()=>handleTaskPress(item.taskId,item.status)}
                        bottomDivider
                        containerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                        
                    >
                        
                    <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <Icon
                            name={getStatusIcon(item.status).name}
                            color={getStatusIcon(item.status).color}
                            containerStyle={{ marginLeft: 10 }}
                            />
                        <ListItem.Chevron color='gray' size={20} style={{ marginLeft:'auto' }}/>

                    </ListItem.Content>
                    </ListItem>

                ))
            }
            <FAB
                title='+'
                placement='right'
                color="#0096FF"
                onPress={handleAddTask}
                style = {{position: 'absolute',
                    bottom: 20,
                    right: 20,}}
            />

        </View>

    
    );
}

export default TaskListScreen;
