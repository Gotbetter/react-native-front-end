import React from 'react';
import {Modal, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import LogoutButton from "./LogoutButton";

function MenuModal({show, onPressClose, onPressLogout}) {

    return (
        <Modal
            animationType="slide"
            presentationStyle="fullScreen"
            visible={show}>
            <View>
                <AntDesign name="close" size={40} onPress={onPressClose}/>
                <LogoutButton onPress={onPressLogout}/>
            </View>
        </Modal>
    );
}

export default MenuModal;
