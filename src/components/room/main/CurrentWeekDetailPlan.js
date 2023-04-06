import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {DARK_BACKGROUND} from "../../../const/color";


function CurrentWeekDetailPlan({dateToFix, dateToEnd, detailPlans}) {

    const dateInfoItems = [
        {
            id: "plan_fix",
            title: "계획 고정까지",
            data: `D-${dateToFix}`
        },
        {
            id: "plan_end",
            title: "이번 계획 종료까지",
            data: `D-${dateToEnd}`
        }
    ]

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
                        data={[
                            {key: 'Tokyo'},
                            {key: 'Delhi fjsd lkfjlsdkfjsdklfjsdklfj sdfjsdklfjsdkldjskldjskldjl'},
                            {key: 'Shanghai'},
                            {key: 'Sao Paolo'},
                            {key: 'Mexico City'},
                            {key: 'Cairo'},
                            {key: 'Dhaka'},
                            {key: 'Mumbai'},
                            {key: 'Beijing'},
                            {key: 'Osaka'},
                        ]}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.detail_plan_text_container}>
                                    <Text style={styles.detail_plan_text}
                                          ellipsizeMode="tail"
                                          numberOfLines={2}>{`\u2022 ${item.key}`}</Text>
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
        },
        current_week_detail_plan_container: {
            marginTop: "6%",
            backgroundColor: DARK_BACKGROUND,
            borderRadius: 16,
            minHeight: hp(20),
            padding: 32,
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
