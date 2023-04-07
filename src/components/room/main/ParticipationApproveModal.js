import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from "react-native";
import ModalHeader from "./ModalHeader";
import UserIcon from "../../common/UserIcon";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

function ParticipationApproveModal({show, onPressClose}) {

    const participants = [
        {
            name: "구름용",
        },
        {
            name: "최인혁",
        },
        {

            name: "최진혁",
        },
        {
            name: "최진혁",
        },

    ]


    return (
        <Modal
            animationType="slide"
            visible={show}
            onRequestClose={onPressClose}>
            <View style={styles.modal_container}>
                <ModalHeader title="초대하기" onPress={onPressClose}/>
                <View style={styles.invite_container}>
                    <ScrollView contentContainerStyle={styles.scroll_wrapper}>
                        {
                            participants.map((participant, index) => (
                                <View key={index} style={[styles.participant_container, styles.shadow]}>
                                    <UserIcon name={participant.name}/>
                                    <Text style={styles.invite_text}>초대</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create(
    {
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        modal_container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#EDEDED',
        },
        invite_container: {
            height: "90%",
            width: "100%",
        },
        scroll_wrapper: {
            padding: 12,
            justifyContent: "space-around"
        },

        participant_container: {

            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            height: hp(15),
            marginBottom: "10%",
            backgroundColor: "#F3F3F3",
            borderRadius: 12,
            borderWidth: 1,

        },
        invite_text: {
            fontSize: 24,
            fontWeight: "bold",
            marginRight: "10%",

        }


    }
);
export default ParticipationApproveModal;
