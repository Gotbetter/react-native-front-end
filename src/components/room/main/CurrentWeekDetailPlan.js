import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {DARK_BACKGROUND} from "../../../const/color";


function CurrentWeekDetailPlan({roomInfo, detailPlans}) {

    const [dateInfoItems, setDateInfoItems] = useState([]);

    useEffect(() => {

        /** 시작 일 **/
        const startDate = new Date(roomInfo.start_date);
        const curWeek = roomInfo.current_week;

        const threeDayPassedDate = new Date(roomInfo.start_date);
        const endDate = new Date(roomInfo.start_date);

        /** 3일 기준 날짜로 변경 **/
        threeDayPassedDate.setDate(startDate.getDate() + (7 * (curWeek - 1)) + 3);
        /** 이번 계획 끝나는 요일 계산 **/
        endDate.setDate(startDate.getDate() + (7 * curWeek));
        const curDate = new Date();

        /** 계획 고정까지 남은 시간 계산 **/
        const dateToFix = Math.floor((threeDayPassedDate.getTime() - curDate.getTime()) / (1000*60*60*24));
        /** 이번 계획 종료일 까지 남은 시간 **/
        const dateToEnd = Math.floor((endDate.getTime() - curDate.getTime()) / (1000*60*60*24));

        const next = [
            {
                id: "plan_fix",
                title: "계획 고정까지",
                data: dateToFix <= 0 ? "마감됨" : `D-${dateToFix}`,
            },
            {
                id: "plan_end",
                title: "이번 계획 종료까지",
                data: dateToEnd <= 0 ? "D-Day" : `D-${dateToEnd}`,
            }
        ];

        setDateInfoItems(next);
    }, [roomInfo]);


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title_text}>이번 주 계획</Text>
            </View>
            <View style={styles.date_info_container}>
                {
                    dateInfoItems.map(item => (
                        <View style={styles.date_info_group} key={item.id}>
                            <Text>{item.title}</Text>
                            <Text>{item.data}</Text>
                        </View>
                    ))
                }
            </View>
            <View style={styles.current_week_detail_plan_container}>
                <ScrollView horizontal={true} style={{width: "100%"}}>
                    <FlatList
                        data={detailPlans}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.detail_plan_text_container}>
                                    <Text style={styles.detail_plan_text}
                                          ellipsizeMode="tail"
                                          numberOfLines={2}>{`\u2022 ${item.content}`}</Text>
                                </View>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        </View>

    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            marginTop: "10%",

        },
        date_info_container: {
            flexDirection: "row",
            justifyContent: "space-around",

        },
        date_info_group: {
            borderRadius: 12,
            width: wp(32),
            height: hp(10),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F3F3F3",

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        current_week_detail_plan_container: {
            marginTop: "6%",
            backgroundColor: DARK_BACKGROUND,
            borderRadius: 16,
            minHeight: hp(20),
            padding: 32,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        detail_plan_text_container: {
            marginBottom: 10,
            width: wp(60)
        },

        detail_plan_text: {
            fontSize: 20,
            color: "white",
            flexWrap: "wrap"
        },

        title_text: {
            fontSize: 18,
        },
    }
);
export default CurrentWeekDetailPlan;
