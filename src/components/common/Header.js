import React from 'react';

import {StyleSheet, View} from "react-native";
import Logo from "./Logo";
import Icon from "react-native-vector-icons/Entypo";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
function Header({onPress}) {
    return (
        <View style={styles.container}>
            <View style={styles.blank}/>
            <Logo/>
            <Icon name="menu" size={40} style={styles.menu} onPress={onPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: "2%",
    },
    blank: {
        width: wp(10),
    },
    menu: {
        marginRight: "2%",
    }

});

export default Header;
