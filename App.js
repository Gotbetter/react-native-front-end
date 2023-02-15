import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import {Provider} from "react-redux";
import {RootSiblingParent} from 'react-native-root-siblings';

import {store} from "./src/module/store";
import MainScreen from "./src/screens/MainScreen";
import RoomTitleFormScreen from "./src/screens/room/form/RoomTItleFormScreen";
import RoomScheduleFormScreen from "./src/screens/room/form/RoomScheduleFormScreen";
import RoomEntryFeeFormScreen from "./src/screens/room/form/RoomEntryFeeFormScreen";
import RoomRulesFormScreen from "./src/screens/room/form/RoomRulesFormScreen";
import JoinRoomScreen from './src/screens/room/join/JoinRoomScreen';
import HomeScreen from './src/screens/HomeScreen';
import MyPlanScreen from './src/screens/MyPlanScreen';


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
                        <Stack.Screen name='room-create-title-form' component={RoomTitleFormScreen}/>
                        <Stack.Screen name='room-create-schedule-form' component={RoomScheduleFormScreen}/>
                        <Stack.Screen name='room-create-entry-fee-form' component={RoomEntryFeeFormScreen}/>
                        <Stack.Screen name='room-create-rules-form' component={RoomRulesFormScreen}/>
                        <Stack.Screen name='join' component={JoinRoomScreen}/>
                        <Stack.Screen name='home' component={HomeScreen}/>
                        <Stack.Screen name='my-plan' component={MyPlanScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>


            </RootSiblingParent>
        </Provider>
    );
};

