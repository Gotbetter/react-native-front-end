import React, {createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {logout} from "../../../module/auth";

FooterItem.propTypes = {
    children: PropTypes.arrayOf(React.Component),
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

    const {navigation} = useContext(FooterItemContext);
    const dispatch = useDispatch();

    /** 로그아웃 눌렀을 경우 **/
    const onPressLogout = () => {
        dispatch(logout())
            .unwrap()
            .then(() => {
                navigation.reset({routes: [{name: 'login'}]});
            });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPressLogout()}>
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
