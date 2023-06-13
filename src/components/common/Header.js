import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import Logo from "./Logo";
import Icon from "react-native-vector-icons/Entypo";
import HeaderTemplate from "./HeaderTemplate";
import {RFValue} from "react-native-responsive-fontsize";

function Header({onPress}) {
    return (
        <View style={styles.container}>
            <View style={styles.blank}/>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo}/>
            <Icon name="menu" size={RFValue(32)} style={styles.menu} onPress={onPress}/>
        </View>

    );
}

const styles = StyleSheet.create(
    {
        container: {

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"

        },
        logo: {
            resizeMode: "contain",
            width: "50%",
            height: "100%",
        },
        blank: {
            width: RFValue(32),
        },
    }
);

export default Header;
