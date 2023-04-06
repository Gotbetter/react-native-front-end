import React from 'react';
import {StyleSheet, View} from "react-native";
import Logo from "./Logo";
import Icon from "react-native-vector-icons/Entypo";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Header({onPress}) {
    return (
        <View style={styles.container}>
            <View style={styles.blank}/>
            <View style={styles.header_container}>
                <View style={{width: 40}}/>
                <Logo/>
                <Icon name="menu" size={40} style={styles.menu} onPress={onPress}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "10%",
    },
    header_container: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: hp(7),
    },
    blank: {
        height: hp(2),
    },
    menu: {
        marginRight: "2%",
    }

});

export default Header;
