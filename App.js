import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import {Provider} from "react-redux";
import {RootSiblingParent} from 'react-native-root-siblings';

import {store} from "./src/module/store";
import MainScreen from "./src/screens/MainScreen";
import RoomTitleFormScreen from "./src/screens/room/form/RoomTItleFormScreen";
import RoomScheduleFormScreen from "./src/screens/room/form/RoomScheduleFormScreen";
import RoomEntryFeeFormScreen from "./src/screens/room/form/RoomEntryFeeFormScreen";
import RoomRulesFormScreen from "./src/screens/room/form/RoomRulesFormScreen";
import JoinRoomScreen from './src/screens/room/join/JoinRoomScreen';
import RoomMainScreen from './src/screens/room/RoomMainScreen';
import MyPlanScreen from './src/screens/plan/PlanScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import RoomCreateResultScreen from "./src/screens/room/form/RoomCreateResultScreen";


const Stack = createNativeStackNavigator();


export default function App() {

    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function checkLogin() {
        const token = await AsyncStorage.getItem("access_token");
        if (token == null) {
            setIsLoading(false);
            setIsLogin(false);
        } else {
            setIsLoading(false);
            setIsLogin(true);
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    if(isLoading){
        return <></>;
    } else {
        return (
            <Provider store={store}>
                <RootSiblingParent>
                    <NavigationContainer>
                            <Stack.Navigator initialRouteName={isLogin === false ? 'login' : 'main'} screenOptions={{headerShown: false}}>
                                <Stack.Screen name='login' component={LoginScreen}/>
                                <Stack.Screen name='register' component={RegisterScreen}/>
                                <Stack.Screen name='main'
                                              component={MainScreen}
                                              options={{gestureEnabled: false}
                                              }/>
                                <Stack.Screen name='room-create-title-form' component={RoomTitleFormScreen}/>
                                <Stack.Screen name='room-create-schedule-form' component={RoomScheduleFormScreen}/>
                                <Stack.Screen name='room-create-entry-fee-form' component={RoomEntryFeeFormScreen}/>
                                <Stack.Screen name='room-create-rules-form' component={RoomRulesFormScreen}/>
                                <Stack.Screen name='room-create-result-screen' component={RoomCreateResultScreen}/>
                                <Stack.Screen name='join' component={JoinRoomScreen}/>
                                <Stack.Screen name='home' component={RoomMainScreen}/>
                                <Stack.Screen name='my-plan' component={MyPlanScreen}/>
                            </Stack.Navigator>
                    </NavigationContainer>
                </RootSiblingParent>
            </Provider>
        );
    }


};

