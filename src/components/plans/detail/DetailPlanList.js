import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP as wp} from "react-native-responsive-screen";
import CheckIcon from "react-native-vector-icons/Fontisto";
import {DislikeEvaluationCount} from "../plan/DislikeEvaluationCount";


function DetailPlanList({detailPlans, onPressModify, participantsCount}) {
    return (
        <View style={styles.container}>
            {
                detailPlans.map(detailPlan => (
                    <View key={detailPlan.detail_plan_id} style={styles.group_container}>
                        <View style={[styles.memo, styles.shadow]}>
                            <Text style={styles.title_text}>Memo</Text>
                            <Text style={styles.text}>{detailPlan.approve_comment}</Text>
                        </View>
                        <View style={[styles.detail_plan_container, styles.shadow]}>
                            <View style={styles.detail_plan_group}>
                                <TouchableOpacity>
                                    <CheckIcon name="checkbox-passive" size={wp(5)}/>
                                </TouchableOpacity>
                                <View style={styles.detail_plan_text_container}>
                                    <Text>{detailPlan.content}</Text>
                                </View>
                                <DislikeEvaluationCount dislikeCount={detailPlan.detail_plan_dislike_count} participantCount={participantsCount}/>
                            </View>
                        </View>
                        <View style={styles.option_container}>
                            <TouchableOpacity onPress={() => onPressModify(detailPlan.detail_plan_id)}>
                                <Text>수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text>사진 추가</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            }
        </View>
    );
}


const styles = StyleSheet.create(
    {
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
            width: "100%",
            marginTop: "5%",
        },
        group_container: {
            marginBottom: "5%",
        },
        memo: {
            padding: wp(2),
            flexDirection: "row",
            backgroundColor: "#778C86",
            borderRadius: 12,

            marginBottom: "3%",

        },
        detail_plan_container: {
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#F3F3F3",
            borderRadius: 12,
            minHeight: heightPercentageToDP(18),



        },
        detail_plan_group: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",

        },
        detail_plan_text_container: {
            marginRight: "3%",
            marginLeft: "3%",
            width: "60%",

        },

        option_container: {
            marginTop: "3%",
            flexDirection: "row",
            justifyContent: "space-around"
        },

        title_text: {
            color: "#ffffff",
            fontWeight: "bold",
            marginRight: "3%",
        },

        text: {
            color: "#ffffff",
        },
    }
);
export default DetailPlanList;
