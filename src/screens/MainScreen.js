import React, {useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useFetchRoomList} from "../hooks/room";
import {fetchUser, logout} from "../module/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BackHandler, Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Logo from "../components/common/Logo";
import {useFocusEffect, useIsFocused, useRoute} from "@react-navigation/native";
import {resetPlanAndDetailPlan, resetRoom, resetRoomCreateRequest} from "../module/room";
import {widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

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

    const roomListToDoubleRow = (roomList) => {

        let result = []
        for (let i = 0; i < roomList.length / 2; i++) {
            result = [...result, roomList.slice(2 * i, 2 * i + 2)];
        }

        return result;
    }


    return (
        <View style={styles.base_container}>
            <View style={styles.logo_container}>
                <Logo/>
                <Button title={'로그아웃'} onPress={() => onPressLogout()}/>

            </View>
            <View style={styles.button_container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('room-create-title-form')}>
                    <Text style={styles.button_text}>방 만들기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('join')}>
                    <Text style={styles.button_text}>참여하기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rooms_outer}>
                <View style={styles.title_container}>
                    <Text style={styles.title_text}>방 목록</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scroll_container} horizontal={true}>
                    {
                        roomListToDoubleRow(roomList).map((room) => (
                            <View key={room[0].room_id}>
                                {
                                    room[0] &&
                                    <TouchableOpacity style={styles.room}
                                                      onPress={() => navigation.navigate('home', {room_id: room[0].room_id})}>
                                        <Text style={styles.button_text}>{room[0].title}</Text>

                                    </TouchableOpacity>

                                }
                                {
                                    room[1] &&
                                    <TouchableOpacity style={styles.room}
                                          onPress={() => navigation.navigate('home', {room_id: room[1].room_id})}>
                                        <Text style={styles.button_text}>{room[1].title}</Text>
                                    </TouchableOpacity>
                                }

                            </View>
                        ))
                    }
                </ScrollView>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    base_container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "center",
    },
    logo_container: {
        width: "100%",
        height: "30%",
    },
    title_container: {
        paddingLeft: 12,
        height: "10%",
        justifyContent: "center",
    },
    title_text: {
        fontWeight: "bold",
        fontSize: 24,
    },
    rooms_outer: {
        marginTop: "10%",
        width: "100%",
        height: "45%",
    },
    scroll_container: {
        height: "100%",
        flexDirection: "row",
    },
    room: {
        backgroundColor: '#FFFFFF',
        width: wp(30),
        height: hp(16),
        borderRadius: 20,
        borderWidth: 5,
        margin: 16,
        borderColor: '#BFBFBF',
        justifyContent: 'center',
    },
    button_container: {
        width: "100%",
        height: "10%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    button: {
        width: "40%",
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

});

export default MainScreen;
