import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetchRoomList, useFetchUser} from "../hooks/room";
import {fetchUser, logout} from "../module/auth";
import {Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {fetchRooms, refreshRooms, resetRoom, resetRoomCreateRequest} from "../module/room";
import RoomItem from "../components/main/RoomItem";
import {resetPlanAndDetailPlan} from "../module/plan";
import Header from "../components/common/Header";
import HomeFooter from "../components/common/HomeFooter";
import MenuModal from "../components/main/MenuModal";
import {RFValue} from "react-native-responsive-fontsize";
import ErrorMessage from "../components/common/ErrorMessage";

function MainScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();


    const { loading, error, message } = useSelector(({room}) => room);
    const [showMenu, setShowMenu] = useState(false);


    const roomList = useFetchRoomList();


    useEffect(() => {
        /** 방 정보, 리스트, 계획, 세부계획 정보 초기값으로 리셋**/
        if (isFocused) {
            dispatch(resetPlanAndDetailPlan());
            dispatch(resetRoomCreateRequest());
            dispatch(resetRoom());
        }

    }, [isFocused]);

    /** 로그아웃 눌렀을 경우 **/
    const onPressLogout = () => {
        dispatch(logout())
            .unwrap()
            .then(() => {
                setShowMenu(false);
                navigation.reset({routes: [{name: 'login'}]});
            });
    };

    /** 방 리스트 새로고침 **/
    const onRefresh = () => {
        dispatch(refreshRooms());
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header onPress={() => setShowMenu(true)}/>
            <View style={styles.contents_container}>

                <Text style={styles.contents_title}>스터디 룸</Text>
                <View style={styles.contents_scroll_view_container}>
                    <ErrorMessage visible={error.ROOM_REFRESHING_FAILED} message={message.ROOM_REFRESHING_FAILED_MESSAGE}/>
                    <ScrollView refreshControl={
                        <RefreshControl refreshing={loading.ROOM_REFRESHING} onRefresh={onRefresh}/>
                    }>
                        {
                            roomList && roomList.map((room) => (
                                <RoomItem key={room.room_id} roomInfo={room}/>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
            <HomeFooter/>
            <MenuModal show={showMenu} onPressClose={() => setShowMenu(false)} onPressLogout={onPressLogout}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "white",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        contents_container: {
            flex: 5,
        },
        contents_title: {
            padding: RFValue(4),
            fontSize: RFValue(20),
        },
        contents_scroll_view_container: {
            flex: 1,
            alignItems: "center",
        }

    }
);

export default MainScreen;
