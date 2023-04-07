import React from 'react';
import {useFetchRoomInfo} from "../../../hooks/room";
import {Modal, View, Text, StyleSheet} from "react-native";
import NextOrCloseButton from "../form/NextOrCloseButton";
import RoomSubInfo from "./RoomSubInfo";
import ModalHeader from "./ModalHeader";

function RoomInfoModal({roomInfo, show, onPressClose}) {

    const items = [
        {
            id: "Title",
            title: "방 이름",
            data: roomInfo.title,
        },
        {
            id: "RoomCode",
            title: "방 코드",
            data: roomInfo.room_code
        },
        {
            id: "Account",
            title: "계좌번호",
            data: roomInfo.account
        },
        {
            id: "StartDate",
            title: "시작 일",
            data: roomInfo.start_date
        },
        {
            id: "MaxUserCount",
            title: "방 최대 인원",
            data: roomInfo.max_user_num,
        },
        {
            id: "Current_user_num",
            title: "현재 인원",
            data: roomInfo.current_user_num,
        },
    ]


    return (
        <Modal
            animationType="slide"
            visible={show}
            onRequestClose={onPressClose}
        >
            <View style={styles.container}>
                <ModalHeader title="방 정보" onPress={onPressClose}/>
                {
                    items.map((item) => (
                        <View key={item.id} style={styles.info_container}>
                            <Text style={styles.title_text} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.content_text}>{item.data}</Text>
                        </View>
                    ))
                }
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: '#EDEDED',
        },
        info_container: {
            padding: 12,
            borderBottomWidth: 1,
            width: "100%",
        },
        title_text:{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: "2%",

        },
        content_text:{
            fontSize: 18
        }

    }
);
export default RoomInfoModal;
