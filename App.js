import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import {Provider} from "react-redux";
import {store} from "./src/module/store";

const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='signin' screenOptions={{headerShown: false}}>
                    <Stack.Screen name='login' component={LoginScreen}/>
                    <Stack.Screen name='register' component={RegisterScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

