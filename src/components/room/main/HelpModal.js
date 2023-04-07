import React from 'react';
import {Modal, StyleSheet, Text, View} from "react-native";
import ModalHeader from "./ModalHeader";
import {BASE_BACKGROUND} from "../../../const/color";

function HelpModal({show, onPressClose}) {
    return (
        <Modal animationType="slide" visible={show} onRequestClose={onPressClose}>
            <View style={styles.container}>
                <ModalHeader title="도움말" onPress={onPressClose}/>
                <View style={styles.content}>
                    <Text style={styles.text}>만드는중</Text>
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
            backgroundColor: BASE_BACKGROUND,
        },
        content: {
            height: "90%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            fontWeight: "bold",
            fontSize: 32,

        }
    }
);
export default HelpModal;
