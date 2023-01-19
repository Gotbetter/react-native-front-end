import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='signin' screenOptions={{headerShown: false}}>
                <Stack.Screen name='signin' component={LoginScreen}/>
                <Stack.Screen name='signup' component={RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

