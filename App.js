import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './app/TabNav';
import LoginScreen from './app/screens/LoginScreen';
import TaskDetailsScreen from './app/screens/TaskDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name='Main' component={TabNav} options={{ headerShown: false }} />
                <Stack.Screen
                    name='TaskDetails'
                    component={TaskDetailsScreen}
                    options={{ title: 'Szczegóły Zadania' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
