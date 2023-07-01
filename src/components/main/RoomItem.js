import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {RFValue} from "react-native-responsive-fontsize";

function RoomItem({roomInfo}) {

    const {room_id, title, week, current_week, entry_fee, max_user_num, current_user_num} = roomInfo;

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('home', {room_id});
    };

    return (
        <TouchableOpacity style={[roomStyles.room, roomStyles.shadow]} onPress={onPress}>
            <View style={roomStyles.title}>
                <Text style={roomStyles.title_text} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
                <Text style={roomStyles.entry_num_text}>{current_user_num}/{max_user_num}</Text>
            </View>
            <SubInfo week={week} maxUserNum={max_user_num} entryFee={entry_fee}/>
        </TouchableOpacity>
    );
}

function SubInfo({week, maxUserNum, entryFee}) {

    return (
        <View style={subInfoStyles.subInfo_container}>
            <View style={subInfoStyles.subinfo}>
                <Text style={subInfoStyles.subinfo_text}>{week}주</Text>
            </View>
            <View style={subInfoStyles.subinfo}>
                <Text style={subInfoStyles.subinfo_text}>{entryFee}원</Text>
            </View>
            <View style={subInfoStyles.subinfo_user}>
                <Image style={subInfoStyles.user_icon} source={require("../../../assets/images/user-icon.png")}
                       resizeMode={"contain"}/>
                <Text style={[subInfoStyles.subinfo_text, {color: "#ffffff"}]}>{maxUserNum}명</Text>
            </View>
        </View>
    )
}

const roomStyles = StyleSheet.create(
    {
        room: {

            backgroundColor: '#FFFFFF',
            width: wp(90),
            height: hp(16),
            borderRadius: 10,

            paddingVertical: 12,
            paddingHorizontal: 20,
            margin: 12,

            justifyContent: 'space-around',

        },
        title: {
            
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
        },
        title_text: {
            width: "80%",
            fontSize: RFValue(16),
            fontWeight: "700",
        },
        text: {
            fontSize: 16
        },
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
    }
);

const subInfoStyles = StyleSheet.create(
    {
        subInfo_container: {
            flexDirection: "row",
            marginTop: "2%",

            width: "60%",
            justifyContent: "space-around",

        },
        subinfo: {
            padding: 8,
            backgroundColor: "#F2F3F5",

            borderRadius: 3,
            justifyContent: "center",
            alignItems: "center",
        },
        user_icon: {
            marginRight: 8,
            width: RFValue(12),
            height: RFValue(12),
            borderWidth: 1,
            borderColor: "#ffffff"
        },
        subinfo_user: {
            padding: 8,
            borderRadius: 3,

            flexDirection: "row",
            backgroundColor: "#697176",
            alignItems: "center",
        },
        subinfo_text: {
            fontSize: RFValue(10),
            color: "#979797",
            fontWeight: "600",
        },
        entry_num_text: {
            fontWeight: "500",
            fontSize: RFValue(10),
        },
    }
)


export default RoomItem;
