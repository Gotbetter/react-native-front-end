import React from 'react';
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP, widthPercentageToDP as wp} from "react-native-responsive-screen";
import PreventRollUpView from "../../common/PreventRollUpView";

function InputModal({week, title, show, onCancel, onChangeText, onConfirm, content}) {
    return (

        <Modal visible={show}
               transparent={true}
               animationType="slide"
               onRequestClose={onCancel}>
            <PreventRollUpView>
                <View style={styles.container}>
                    <View style={styles.input_container}>
                        <Text style={styles.text}>{title}</Text>
                        <View style={[styles.week, styles.shadow]}>
                            <Text>{week}주차</Text>
                        </View>
                        <TextInput style={[styles.input, styles.shadow]}
                                   value={content}
                                   multiline={true} placeholder="세부 계획을 입력해 주세요"
                                   onChangeText={onChangeText}/>

                        <View style={styles.button_container}>
                            <TouchableOpacity style={[styles.cancel_button_text, styles.shadow]} onPress={onCancel}>
                                <Text>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.confirm_button_text, styles.shadow]} onPress={onConfirm}>
                                <Text>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </PreventRollUpView>
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
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",

            justifyContent: "center",
            alignItems: "center",
        },
        input_container: {
            width: "80%",
            height: "50%",
            backgroundColor: "#ffffff",

            justifyContent: "center",

            padding: wp(8),
        },
        input: {
            borderWidth: 1,
            marginTop: "3%",
            backgroundColor: "#D9D9D9",
            padding: wp(2),
            minHeight: heightPercentageToDP(20),
            textAlignVertical: 'top',
        },
        week: {
            marginTop: "3%",
            backgroundColor: "#D9D9D9",
            padding: wp(2),
            borderWidth: 1,

        },
        button_container: {
            marginTop: "4%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",

        },
        cancel_button_text: {
            justifyContent: "center",
            alignItems: "center",
            width: "40%",
            padding: wp(2),
            borderRadius: wp(3),
            borderWidth: 2,

            backgroundColor: "#D9D9D9",

        },
        confirm_button_text: {
            width: "40%",
            padding: wp(2),
            borderRadius: wp(3),
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B4C8BB"
        },
        text: {
            fontSize: 18,
            fontWeight: "bold",
        }

    }
);

export default InputModal;
