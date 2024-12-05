import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log(`Zapisano ${key}: ${value}`);
    } catch (error) {
        console.error(`Błąd podczas zapisywania ${key}:`, error);
        throw new Error('Nie udało się zapisać danych');
    }
}

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Błąd', 'Proszę uzupełnić wszystkie pola');
            return;
        }

        try {
            await save('login', email);
            await save('password', password);
            Alert.alert('Sukces', 'Dane zostały zapisane!');
            navigation.navigate('Main');
        } catch (error) {
            Alert.alert('Błąd', 'Nie udało się zapisać danych');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Screen</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize='none'
            />
            <Button title='Login' onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5
    }
});

export default LoginScreen;
