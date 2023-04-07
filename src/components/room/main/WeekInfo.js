import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {BRIGHT_BACKGROUND} from "../../../const/color";

function WeekInfo({totalWeek, currentWeek}) {

    const items = [
        {
            id: "total",
            title: "전체 주차",
            week: totalWeek
        },
        {
            id: "current",
            title: "현재 주차",
            week: currentWeek
        },
    ];


    return (
        <View style={styles.container}>
            {
                items.map(item => (
                    <View key={item.id}>
                        <Text style={styles.content_title_text}>{item.title}</Text>
                        <View style={[styles.week, styles.shadow]}>
                            <Text style={styles.content_title_text}>{item.week} 주차</Text>
                        </View>
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
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
    container: {
        marginTop: "8%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    week: {
        marginTop: "6%",
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 16,
        width: wp(30),
        padding: 12,
        backgroundColor: BRIGHT_BACKGROUND,
    },
    content_title_text: {
        fontSize: 18,
    },
})
export default WeekInfo;
