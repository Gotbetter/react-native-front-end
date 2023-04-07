import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";

function WeekList({}) {

    const weekList = [1, 2, 3, 4];

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Feather name="chevron-left" style={styles.close_icon} size={35} />
            </TouchableOpacity>
            <View style={styles.week_container}>
                {
                    weekList.map((week,index) => (
                        <TouchableOpacity key={index} style={styles.week}>
                            <Text style={styles.text}>{week}주차</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <TouchableOpacity>
                <Feather name="chevron-right" style={styles.close_icon} size={35} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "8%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        week_container: {
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",

        },
        week :{
            width: wp(14),
            height: hp(5),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "#B4C8BB",

        },
        text: {
            color: "#ffffff",
            fontSize: 15,
        },
    }
)

export default WeekList;
