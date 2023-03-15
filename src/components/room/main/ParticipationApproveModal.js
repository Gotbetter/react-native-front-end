import React from 'react';
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RoomSubInfo from "./RoomSubInfo";
import NextOrCloseButton from "../form/NextOrCloseButton";

function ParticipationApproveModal({roomInfo, approvalModal, setApprovalModal, waitingParticipants, onPressApproval}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={approvalModal}
            onRequestClose={() => {
                setApprovalModal(!approvalModal);
            }}>
            <View style={styles.modal_container}>
                <View style={styles.modal_center_align}>
                    <View style={styles.modal_subInfo_container}>
                        <RoomSubInfo title={roomInfo.title} account={roomInfo.account} roomCode={roomInfo.room_code}
                                     entryFee={roomInfo.entry_fee} totalEntryFee={roomInfo.total_entry_fee}/>
                    </View>
                    <View style={styles.modal_waiting_container}>
                        <Text style={styles.title}>
                            대기자
                        </Text>
                        {
                            waitingParticipants.map((participants) => (
                                <View style={styles.modal_waiting_list} key={participants.user_id}>
                                    <Text style={styles.modal_text}>
                                        {participants.username}
                                    </Text>
                                    <TouchableOpacity style={styles.approval_button}
                                                      onPress={() => onPressApproval(participants.user_id, participants.participant_id)}>
                                        <Text style={styles.approval_button_text}>승인</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                    <View style={styles.button_container}>
                        <NextOrCloseButton onPress={() => setApprovalModal(false)} name={'닫기'}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create(
    {
        modal_container: {
            justifyContent: "center",
            alignItems: "center",
            width: '100%',
            height: '100%',
            backgroundColor: '#EDEDED',
        },
        modal_center_align: {
            width: "100%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
        },
        modal_subInfo_container: {
            width: "80%",
            height: "30%",
            backgroundColor: "white",
            borderRadius: 16,
            marginBottom: "10%",
        },
        modal_waiting_container: {
            width: "80%",
            height: "30%",
            borderWidth: 1,
            borderRadius: 16,
            padding: 16,
            marginBottom: "10%",
            backgroundColor: "white",
        },
        modal_waiting_list: {
            width: "60%",
            height: "20%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2%",

        },
        button_container: {
            width: "40%",
            height: "8%",
        },
        approval_button: {
            borderWidth: 1,
            borderRadius: 16,
            height: "100%",
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
        },
        approval_button_text: {
            fontSize: "16%",
            fontWeight: "bold",
            color: "blue",

        },
        title: {
            color: '#000000',
            fontWeight: "bold",
            fontSize: "25%",
        },
        modal_text: {
            fontSize: "18%",
        },

    }
);
export default ParticipationApproveModal;
