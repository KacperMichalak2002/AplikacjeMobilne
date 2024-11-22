import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, Alert } from 'react-native';

function SettingsScreen({ route }) {
    const { displayPreferences } = route.params || {};
    const [isDarkMode, setIsDarkMode] = useState(displayPreferences?.darkMode || false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        console.log('Zapisano ustawienia:', { username, email, isDarkMode });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nazwa użytkownika</Text>
            <TextInput
                style={styles.input}
                placeholder='Wpisz swoją nazwę użytkownika'
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder='Wpisz swój email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Tryb ciemny</Text>
                <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>

            <Button title='Zapisz ustawienia' onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    }
});

export default SettingsScreen;
