import React from 'react';
import {useFetchRoomInfo} from "../../../hooks/room";
import {Modal, View, Text, StyleSheet} from "react-native";
import NextOrCloseButton from "../form/NextOrCloseButton";
import RoomSubInfo from "./RoomSubInfo";

function RoomInfoModal({show, setShow}) {

    const roomInfo = useFetchRoomInfo();

    return (
        roomInfo &&
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
        >
            <View style={styles.container}>
                <View style={styles.subInfo_container}>
                    <RoomSubInfo
                        title={roomInfo.title}
                        account={roomInfo.account}
                        totalEntryFee={roomInfo.total_entry_fee}
                        entryFee={roomInfo.entry_fee}
                        roomCode={roomInfo.room_code}
                    />
                </View>

                <View style={styles.button_container}>
                    <NextOrCloseButton name='나가기' onPress={() => setShow(!show)}/>
                </View>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#EDEDED',
        },
        subInfo_container: {
            width: "80%",
            height: "30%",
            borderRadius: 16,
            backgroundColor: "white",
        },
        button_container: {
            marginTop: "12%",
            width: "40%",
            height: "8%",
        },

    }
);
export default RoomInfoModal;
