import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Button } from 'react-native-elements';

function MojeKonto({ navigation, route }) {
    const { displayPreferences } = route.params || {};
    const [isDarkMode, setIsDarkMode] = React.useState(displayPreferences?.darkMode || false);

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View>
            <Text>Ustawienia</Text>
            <Text>Tryb ciemny</Text>
            <Switch value={isDarkMode} onValueChange={value => setIsDarkMode(value)} />
            <Button onPress={handleLogout} title={'Wyloguj się'} />
        </View>
    );
}

export default MojeKonto;
