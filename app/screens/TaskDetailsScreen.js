import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Switch } from 'react-native-elements';
import { useTasks } from '../TaskContext';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


function TaskDetailsScreen({ route, navigation }) {
    const { task } = route.params || {};
    const [status, setStatus] = useState(task.status);
    const [image, setImage] = useState(task.imageUri);
    const [urgency, setUrgency] = useState(task.urgency);
    const { updateTaskStatus, updateImage, updateUrgency } = useTasks();
    const [permission, requestPermission] = useCameraPermissions();
    const [torch, setTorch] = useState(false);
    const [cameraVisible, setCameraVisible] = useState(false);


    const toggleTorch = async () => {
        setCameraVisible(true);

        for (let i = 0; i < 3; i++) {
            setTorch(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            setTorch(false);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        setCameraVisible(false);
        setTorch(false);
    };
    
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        }
        if (urgency === 'Urgent') {
            toggleTorch();
        }

    }, [permission, requestPermission]);

    const toggleSwitch = () => {
        const newStatus = status === 'Completed' ? 'In Progress' : 'Completed';
        setStatus(newStatus);
        updateTaskStatus(task.id, newStatus);
    };

    const toggleSwitchUrgency = () => {
        const newUrgency = urgency === 'Urgent' ? 'Normal' : 'Urgent';
        setUrgency(newUrgency);
        updateUrgency(task.id, newUrgency);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setImage(imageUri);
            updateImage(task.id, imageUri);
        }
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>Szczegóły zadania</Text>
            <Text>ID zadania: {task.id}</Text>
            <Text>Progress zadania: {status}</Text>
            <Text>Opis: {task.description}</Text>
            <Text>Urgency: {urgency}</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={status === 'Completed' ? '#2596be' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitch}
                value={status === 'Completed'}
            />
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={urgency === 'Urgent' ? '#2596be' : '#f4f3f4'}
                ios_backgroundColor='#3e3e3e'
                onValueChange={toggleSwitchUrgency}
                value={urgency === 'Urgent'}
            />

            <View>
                <TouchableOpacity onPress={pickImage} style={styles.touchable}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                    ) : (
                        <Image
                            source={require('../../assets/personImage.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    )}
                </TouchableOpacity>
            </View>

            <Button title="Powrót do listy zadań" onPress={() => navigation.goBack()} />
            {cameraVisible && <CameraView style={styles.camera} active={false} enableTorch={torch} />}
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    touchable: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      message: {
        textAlign: 'center',
        paddingBottom: 10,
      },
      camera: {
        flex: 1,
        height: 0,
        width: 0
      },

});

export default TaskDetailsScreen;
