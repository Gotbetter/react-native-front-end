import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetchRoom} from "../hooks/room";
import {logout} from "../module/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Logo from "../components/common/Logo";

function MainScreen({navigation}) {
    // 현재 화면을 focuse 하고 있다면 true return
    const dispatch = useDispatch();
    const [rooms, isFetchRoom] = useFetchRoom();

    const {user, isLogin} = useSelector(({auth}) => ({
        user: auth.user,
        isLogin: auth.status.LOGIN,
    }));


    useEffect(() => {
        if (isLogin === 401) {
            dispatch(logout());
        }
    }, [isLogin]);


    const onPressLogout = () => {
        dispatch(logout());
        AsyncStorage.clear();
        navigation.navigate('login');
    }

    const goToRoomFormScreen = () => {
        navigation.navigate('room-create-title-form');
    }

    const goToJoinRoomScreen = () => {
        navigation.navigate('join');
    }

    return (
        <View style={styles.container}>

            <View style={{flex: 4}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 2}}>
                    <Logo/>
                    <Button title={'로그아웃'} onPress={onPressLogout}/>
                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={styles.button_container}>
                <View style={{flex: 0.5}}/>
                <TouchableOpacity style={styles.button} onPress={goToRoomFormScreen}>
                    <Text style={styles.button_text}>방 만들기</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={styles.button} onPress={goToJoinRoomScreen}>
                    <Text style={styles.button_text}>참여하기</Text>
                </TouchableOpacity>
                <View style={{flex: 0.5}}/>
            </View>

            {isFetchRoom && (
                <Text>로딩중...</Text>
            )}

            <View style={{flex: 3, alignItems: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={styles.rooms_container}>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 4.5, flexDirection: 'row',}}>
                        {rooms && (
                            rooms.map((room, index) => (
                                <View key={rooms[index].room_id} style={{flex: 1, alignItems: 'center'}}>
                                    <View style={{flex: 1}}/>
                                    <TouchableOpacity style={styles.room}
                                                      onPress={() => navigation.navigate('home', {room_id: rooms[index].room_id})}>
                                        <Text style={styles.button_text}>{rooms[index].title}</Text>
                                    </TouchableOpacity>
                                    <View style={{flex: 1}}/>
                                </View>
                            ))
                        )}
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={{flex: 2}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo_image: {
        flex: 1,
        alignSelf: 'center',
        width: '80%',
    },
    button_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 4,
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#DBDBDB'
    },
    button_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
    },
    rooms_container: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBDBDB',
        borderRadius: 20,
        width: '90%',
    },
    room: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center'
    }
});

export default MainScreen;
