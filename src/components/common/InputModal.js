import React from 'react';
import {Modal, StyleSheet, Text, TextInput, View} from "react-native";
import InputGroup from "../room/form/InputGroup";
import NextOrCloseButton from "../room/form/NextOrCloseButton";

function InputModal({modalTitle, onChangeTarget, show, setShow, onPress}) {
    return (
        show && <Modal isVisible={true}
                       transparent>
            <View style={styles.modal_container}>
                <View style={styles.modal_subInfo}>
                    <Text style={styles.subInfo_text}>{modalTitle}</Text>
                </View>
                <TextInput style={styles.input} onChangeText={(text) => onChangeTarget(text)}/>
                <View style={styles.modal_button_group_container}>
                    <View style={styles.modal_button}>
                        <NextOrCloseButton name={'입력'} onPress={onPress}/>
                    </View>
                    <View style={styles.modal_button}>
                        <NextOrCloseButton name={'취소'} onPress={() => setShow(false)}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create(
    {

        modal_container: {
            borderWidth: 1,
            height: "100%",
            width: "100%",
            backgroundColor: 'white',
            justifyContent: "center",
            alignItems: "center",
        },
        modal_subInfo: {
            width: "90%",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
        },
        input: {
            borderWidth: 1,
            width: "90%",
            height: "10%",
            marginTop: "5%",
            padding: 10,
        },
        subInfo_text: {
            fontWeight: "bold",
            fontSize: 18,
        },
        modal_button_group_container: {
            marginTop: "10%",
            flexDirection: "row",
            width: "90%",
            height: "6%",
            justifyContent: "space-around",
        },
        modal_button: {
            width: "30%",
            height: "100%",
        },

    }
);

export default InputModal;
