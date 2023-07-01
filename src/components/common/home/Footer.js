import React from 'react';
import {StyleSheet, View} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import FooterItem from "./FooterItem";

function Footer() {

    return (
        <View style={styles.container}>
            <FooterItem>
                <FooterItem.Main/>
                <FooterItem.RoomCode/>
                <FooterItem.CreateRoom/>
                <FooterItem.MyPage />
            </FooterItem>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 0.6,
            padding: RFValue(4),
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
        },

    }
);
export default Footer;
