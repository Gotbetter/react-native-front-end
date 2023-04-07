import React from 'react';
import {StyleSheet, View} from "react-native";
import Logo from "./Logo";
import Icon from "react-native-vector-icons/Entypo";
import HeaderTemplate from "./HeaderTemplate";

function Header({onPress}) {
    return (
        <HeaderTemplate>
            <View style={{width: 40}}/>
            <Logo/>
            <Icon name="menu" size={40} style={styles.menu} onPress={onPress}/>
        </HeaderTemplate>
    );
}

const styles = StyleSheet.create({
    menu: {
        marginRight: "2%",
    }

});

export default Header;
