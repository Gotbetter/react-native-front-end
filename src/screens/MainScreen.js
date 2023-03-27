import React, {useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useFetchRoomList} from "../hooks/room";
import {fetchUser} from "../module/auth";
import {BackHandler, ScrollView, StyleSheet, Text, View} from "react-native";
import Logo from "../components/common/Logo";
import {useFocusEffect, useIsFocused, useRoute} from "@react-navigation/native";
import {resetRoom, resetRoomCreateRequest} from "../module/room";
import MainNavButton from "../components/main/MainNavButton";
import LogoutButton from "../components/main/LogoutButton";
import RoomItem from "../components/main/RoomItem";
import {resetPlanAndDetailPlan} from "../module/plan";

function MainScreen() {

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
                <LogoutButton/>
            </View>
            <View style={styles.button_container}>
                <MainNavButton name="방만들기" path="room-create-title-form"/>
                <MainNavButton name="참여하기" path="join"/>
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
                                    <RoomItem room_id={room[0].room_id} title={room[0].title}/>
                                }
                                {
                                    room[1] &&
                                    <RoomItem room_id={room[1].room_id} title={room[1].title}/>
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

    button_container: {
        width: "100%",
        height: "10%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },



});

export default MainScreen;
