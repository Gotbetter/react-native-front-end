import React, {createContext, useContext, useState} from 'react';
import PropTypes, {func} from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import {useNavigation} from "@react-navigation/native";

FooterItem.propTypes = {
    children: PropTypes.instanceOf(React.Component),
};

const FooterItemContext = createContext();

function FooterItem({children}) {
    const navigation = useNavigation();

    return (
        <FooterItemContext.Provider value={{navigation}}>
            {children}
        </FooterItemContext.Provider>
    )
}

function Main() {
    const {navigation} = useContext(FooterItemContext);

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("main")}>
            <Image source={require("../../../../assets/images/home.png")}/>
            <Text style={styles.text}>홈</Text>
        </TouchableOpacity>
    );
}

function RoomCode() {
    const {navigation} = useContext(FooterItemContext);

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("join")}>
            <Image source={require("../../../../assets/images/room-code.png")}/>
            <Text style={styles.text}>방코드 검색</Text>
        </TouchableOpacity>
    );
}

function CreateRoom() {
    const {navigation} = useContext(FooterItemContext);

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("create-room-base-info")}>
            <Image source={require("../../../../assets/images/room-create.png")}/>
            <Text style={styles.text}>방 만들기</Text>
        </TouchableOpacity>
    );
}

function MyPage() {

    return (
        <TouchableOpacity style={styles.container} disabled={true}>
            <Image source={require("../../../../assets/images/my-page.png")}/>
            <Text style={styles.text}>마이 페이지</Text>
        </TouchableOpacity>
    );
}

FooterItem.Main = Main;
FooterItem.RoomCode = RoomCode;
FooterItem.CreateRoom = CreateRoom;
FooterItem.MyPage = MyPage;

const styles = StyleSheet.create(
    {
        container: {

            flexDirection: "column",
            alignItems: "center"
        },
        text: {
            marginTop: RFValue(4),
            fontSize: RFValue(10),
            color: "#979797",
            fontWeight: "700",
        }

    }
);

export default FooterItem;
