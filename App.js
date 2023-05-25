import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import {Provider} from "react-redux";
import {RootSiblingParent} from 'react-native-root-siblings';

import {store} from "./src/module/store";
import MainScreen from "./src/screens/MainScreen";
import JoinRoomScreen from './src/screens/room/join/JoinRoomScreen';
import RoomMainScreen from './src/screens/room/RoomMainScreen';
import MyPlanScreen from './src/screens/plan/PlanScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import BaseInfoFormScreen from "./src/screens/room/form/BaseInfoFormScreen";
import RulesAndAccountFormScreen from "./src/screens/room/form/RulesAndAccountFormScreen";


const Stack = createNativeStackNavigator();


export default function App() {

    const [isLogin, setIsLogin] = useState(null);
    const [isLoaded, setIsLoaded] = useState(null);

    async function checkLogin() {
        const token = await AsyncStorage.getItem("access_token");
        if (token == null) {
            setIsLogin(false);

        } else {
            setIsLogin(true);
        }
        setIsLoaded(true);
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        isLoaded && <Provider store={store}>
            <RootSiblingParent>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={isLogin === false ? 'login' : 'main'}
                                     screenOptions={{headerShown: false}}>
                        <Stack.Screen name='login' component={LoginScreen}/>
                        <Stack.Screen name='register' component={RegisterScreen}/>
                        <Stack.Screen name='main'
                                      component={MainScreen}
                                      options={{gestureEnabled: false}
                                      }/>
                        <Stack.Screen name='create-room-base-info' component={BaseInfoFormScreen}/>
                        <Stack.Screen name='create-room-rules-and-account' component={RulesAndAccountFormScreen}/>
                        <Stack.Screen name='join' component={JoinRoomScreen}/>
                        <Stack.Screen name='home' component={RoomMainScreen}/>
                        <Stack.Screen name='my-plan' component={MyPlanScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </RootSiblingParent>
        </Provider>


    );
};



