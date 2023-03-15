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
                    <RoomSubInfo
                        title={roomInfo.title}
                        account={roomInfo.account}
                        totalEntryFee={roomInfo.total_entry_fee}
                        entryFee={roomInfo.entry_fee}
                        roomCode={roomInfo.room_code}
                    />
                <NextOrCloseButton name='나가기' onPress={() => setShow(!show)}/>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
        },
    }
);
export default RoomInfoModal;
