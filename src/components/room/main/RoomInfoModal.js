import React from 'react';
import {useFetchRoomInfo} from "../../../hooks/room";
import {Modal, View, Text, StyleSheet} from "react-native";
import NextOrCloseButton from "../form/NextOrCloseButton";
import RoomSubInfo from "./RoomSubInfo";
import ModalHeader from "./ModalHeader";

function RoomInfoModal({show, onPressClose}) {

    const items = [
        {
            title: "방 이름",
            data: "dnd"
        },
        {
            title: "방 코드",
            data: "JIEKnk2"
        },
        {
            title: "계좌번호",
            data: "신한 1111-2222-333"
        },
        {
            title: "시작 일",
            data: "2023-02-03"
        },
        {
            title: "방 최대 인원",
            data: "6"
        },
        {
            title: "현재 인원",
            data: "3"
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
                    items.map((item, index) => (
                        <View key={index} style={styles.info_container}>
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
