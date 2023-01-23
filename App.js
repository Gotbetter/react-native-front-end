import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import {Provider} from "react-redux";
import {RootSiblingParent} from 'react-native-root-siblings';

import {store} from "./src/module/store";
import MainScreen from "./src/screens/MainScreen";

const Stack = createNativeStackNavigator();




export default function App() {
    return (
        <Provider store={store}>
            <RootSiblingParent>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='login' screenOptions={{headerShown: false}}>
                        <Stack.Screen name='login' component={LoginScreen}/>
                        <Stack.Screen name='register' component={RegisterScreen}/>
                        <Stack.Screen name='main' component={MainScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>


            </RootSiblingParent>
        </Provider>
    );
};

