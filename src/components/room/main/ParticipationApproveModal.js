import React from 'react';
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

function ParticipationApproveModal({approvalModal, setApprovalModal, waitingParticipants, onPressApproval}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={approvalModal}
            onRequestClose={() => {
                setApprovalModal(!approvalModal);
            }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.modal_container}>
                    <View style={styles.modal_contents}>
                        <Text style={styles.modal_text}>
                            대기자
                        </Text>
                        {
                            waitingParticipants.map((participants) => (
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.modal_text}>
                                            {participants.username}
                                        </Text>
                                        <Button title={'승인'}
                                                onPress={() => onPressApproval(participants.user_id, participants.participant_id)}/>
                                    </View>
                                ))
                        }
                    </View>
                    <TouchableOpacity onPress={() => setApprovalModal(false)}
                                      style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.modal_text}>
                            닫기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create(
    {
        modal_container: {
            backgroundColor: '#EDEDED',
            width: '90%',
            height: '30%',
            borderRadius: 30,
            borderWidth: 5,
            borderColor: '#DBDBDB'
        },
        modal_contents: {
            flex: 4,
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: 'center',
        },
        modal_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 30,
        },
    }
);
export default ParticipationApproveModal;
