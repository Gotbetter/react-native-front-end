import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useFetchRoomList} from "../hooks/room";
import {fetchUser, logout} from "../module/auth";
import {BackHandler, ScrollView, StyleSheet, Text, View} from "react-native";
import {useFocusEffect, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {resetRoom, resetRoomCreateRequest} from "../module/room";
import RoomItem from "../components/main/RoomItem";
import {resetPlanAndDetailPlan} from "../module/plan";
import Header from "../components/common/Header";
import HomeFooter from "../components/common/HomeFooter";
import MenuModal from "../components/main/MenuModal";

function MainScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const curScreen = useRoute();
    const isFocused = useIsFocused();

    const roomList = useFetchRoomList();
    const [showMenu, setShowMenu] = useState(false);

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
        dispatch(logout())
            .unwrap()
            .then(() => {
                setShowMenu(false);
                navigation.reset({routes: [{name: 'login'}]});
            });
    };
    const onPressMenu = () => {
        setShowMenu(true);
    }

    const onPressClose = () => {
        setShowMenu(false);
    }
    return (
        <View style={styles.container}>
            <Header onPress={onPressMenu}/>
            <View style={styles.room_list_container}>
                <View style={styles.room_list_title}>
                    <Text style={styles.room_list_title_text}>스터디 룸</Text>
                </View>
                <ScrollView style={styles.room_list} contentContainerStyle={{alignItems: "center"}}>
                    {
                        roomList && roomList.map((room) => (
                            <View key={room.room_id}>
                                <RoomItem roomInfo={room}/>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
            <HomeFooter/>
            <MenuModal show={showMenu} onPressClose={onPressClose} onPressLogout={onPressLogout}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        alignItems: "center",
    },
    room_list_container: {
        padding: 16,
        width: "100%",
        height: "80%",
    },
    room_list_title: {},
    room_list: {
        width: "100%",
        height: "100%",

    },
    room_list_title_text: {
        fontSize: 20,
    },

});

export default MainScreen;
