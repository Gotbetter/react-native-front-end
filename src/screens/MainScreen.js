import React, {useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useFetchRoomList} from "../hooks/room";
import {fetchUser, logout} from "../module/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BackHandler, Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Logo from "../components/common/Logo";
import {useFocusEffect, useIsFocused, useRoute} from "@react-navigation/native";
import {resetPlanAndDetailPlan, resetRoom, resetRoomCreateRequest} from "../module/room";

function MainScreen({navigation}) {

    const dispatch = useDispatch();
    const curScreen = useRoute();
    const isFocused = useIsFocused();

    const roomList = useFetchRoomList();

    /** Android 로그인 화면으로 뒤로가기 금지하기 **/
    useFocusEffect(useCallback(() => {
        const onBackPress = () => {
            if (curScreen.name === 'main') {
                return true;
            } else {
                return false;
            }
        }

        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [curScreen]));


    useEffect(() => {
        /** 로그인한 유저 정보 불러오기 **/
        dispatch(fetchUser());

    }, [roomList]);

    useEffect(() => {
        /** 방 정보, 리스트, 계획, 세부계획 정보 초기값으로 리셋**/
        if (isFocused) {
            dispatch(resetPlanAndDetailPlan());
            dispatch(resetRoomCreateRequest());
            dispatch(resetRoom());
        }
    }, [isFocused]);

    const onPressLogout = () => {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .catch(err => err)
            .then(() => {
                dispatch(logout());
                navigation.navigate('login');
            })
            .catch(err => err);
    };


    return (
        <View style={styles.container}>

            <View style={{flex: 4}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 2}}>
                    <Logo/>
                    <Button title={'로그아웃'} onPress={() => onPressLogout()}/>
                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={styles.button_container}>
                <View style={{flex: 0.5}}/>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('room-create-title-form')}>
                    <Text style={styles.button_text}>방 만들기</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('join')}>
                    <Text style={styles.button_text}>참여하기</Text>
                </TouchableOpacity>
                <View style={{flex: 0.5}}/>
            </View>

            <View style={{flex: 3, alignItems: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={styles.rooms_container}>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 4.5, flexDirection: 'row',}}>
                        {roomList && (
                            roomList.map((room) => (
                                <View key={room.room_id} style={{flex: 1, alignItems: 'center'}}>
                                    <View style={{flex: 1}}/>
                                    <TouchableOpacity style={styles.room}
                                                      onPress={() => navigation.navigate('home', {room_id: room.room_id})}>
                                        <Text style={styles.button_text}>{room.title}</Text>
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
