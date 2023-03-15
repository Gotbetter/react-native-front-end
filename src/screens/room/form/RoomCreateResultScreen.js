import React from 'react';
import {useNavigation, useRoute} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {StyleSheet, Text, View} from "react-native";
import NextOrCloseButton from "../../../components/room/form/NextOrCloseButton";

function RoomCreateResultScreen() {
    const navigation = useNavigation();
    const {params: {selectedRuleContents}} = useRoute();
    const {request, roomInfo} = useSelector(({room}) => ({
        request: room.roomRequest,
        roomInfo: room.roomInfo,
    }));

    const onPressEnter = () => {
        navigation.navigate('main');
    }

    return (
        <View style={styles.container}>
            <View style={styles.subInfo}>
                <Text>스터디방 이름: {request.title}</Text>
                <Text>스터디방 인원: {request.max_user_num}</Text>
                <Text>스터디 시작일: {request.start_date.toLocaleDateString()}</Text>
                <Text>스터디 기간: {request.week}주</Text>
                <Text>스터디방 참가비: {request.entry_fee}</Text>
                <Text>스터디방 규칙: {selectedRuleContents}</Text>
                <Text style={styles.highlight}>방 코드: {roomInfo.room_code}</Text>
            </View>
            <View style={styles.button_container}>
                <NextOrCloseButton name={'확인'} onPress={onPressEnter}/>
            </View>


        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
        },
        subInfo: {
            borderWidth: 1,
            borderRadius: 18,
            padding: 12,
        },
        button_container: {
            marginTop: "10%",
            width: "30%",
            height: "10%",
        },
        highlight: {
            fontWeight: "bold",
            fontSize: 18,
            color: "red",
        },
    }
);

export default RoomCreateResultScreen;
