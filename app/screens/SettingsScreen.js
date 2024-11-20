import React from 'react';
import { View, Text, Switch } from 'react-native';

function SettingsScreen({ route }) {
    const { displayPreferences } = route.params || {};
    const [isDarkMode, setIsDarkMode] = React.useState(displayPreferences?.darkMode || false);

    return (
        <View>
            <Text>Ustawienia</Text>
            <Text>Tryb ciemny</Text>
            <Switch value={isDarkMode} onValueChange={value => setIsDarkMode(value)} />
        </View>
    );
}

export default SettingsScreen;
