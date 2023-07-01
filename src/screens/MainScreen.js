import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetchRoomList} from "../hooks/room";
import {Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {refreshRooms, resetRoom, resetRoomCreateRequest} from "../module/room";
import RoomItem from "../components/main/RoomItem";
import {resetPlanAndDetailPlan} from "../module/plan";
import Footer from "../components/common/home/Footer";
import {RFValue} from "react-native-responsive-fontsize";
import ErrorMessage from "../components/common/ErrorMessage";
import Logo from "../components/common/Logo";

function MainScreen() {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();


    const { loading, error, message } = useSelector(({room}) => room);
    const roomList = useFetchRoomList();


    useEffect(() => {
        /** 방 정보, 리스트, 계획, 세부계획 정보 초기값으로 리셋**/
        if (isFocused) {
            dispatch(resetPlanAndDetailPlan());
            dispatch(resetRoomCreateRequest());
            dispatch(resetRoom());
        }

    }, [isFocused]);


    /** 방 리스트 새로고침 **/
    const onRefresh = () => {
        dispatch(refreshRooms());
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo_container}>
                <Logo size={RFValue(200)}/>
            </View>
            <View style={styles.contents_container}>
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
            <Footer/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create(
    {
        logo_container: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
        },
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
            backgroundColor: "#F5F5F5",
            alignItems: "center",
        }

    }
);

export default MainScreen;
