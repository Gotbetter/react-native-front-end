import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckIcon from "react-native-vector-icons/Fontisto";

// 화면 비율 맞추기 위한 lib
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Entypo";
import InputModal from "../../common/InputModal";

function DetailPlanList({
                            plan,
                            planDislikeInfo,
                            participantsCount,
                            isMyPlan,
                            detailPlans,
                            onPressCheckBox,
                            onPressModifyButton,
                            onPressDetailPlanDislike,

                        }) {



    return (
        detailPlans.map((detailPlan) => (
            <View style={styles.outer_container} key={detailPlan.detail_plan_id}>
                <View style={styles.main_content_container}>
                    {
                        isMyPlan !== true ?
                            <View/> : <CheckBox detailPlanId={detailPlan.detail_plan_id}
                                                complete={detailPlan.complete}
                                                onPressCheckBox={onPressCheckBox}
                            />
                    }
                    <View style={styles.content_container}>
                        <DetailPlanItem content={detailPlan.content}/>
                        <Text style={styles.additional_info_text}>{detailPlan.approve_comment}</Text>
                    </View>

                    {
                        isMyPlan !== true ?
                            <EvaluationButton detailPlanId={detailPlan.detail_plan_id}
                                              isDislikeChecked={detailPlan.detail_plan_dislike_checked}
                                              onPress={onPressDetailPlanDislike}/>
                            :
                            <ModifyFileAddButton detailPlanId={detailPlan.detail_plan_id}
                                                 onPressModifyButton={onPressModifyButton}/>
                    }

                </View>
                <View style={styles.dislike_count_container}>
                {
                    plan.three_days_passed && (
                            <Text>싫어요 수: {detailPlan.detail_plan_dislike_count} / {participantsCount}</Text>
                    )
                }
                </View>
            </View>

        ))
    )
        ;

}

const DetailPlanItem = ({content}) => {
    return <Text style={styles.content_text}>{content}</Text>
};

const CheckBox = ({detailPlanId, complete, onPressCheckBox}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => onPressCheckBox(complete, detailPlanId)}>
                <CheckIcon name={complete === true ? "checkbox-active" : "checkbox-passive"} size={wp(5)}/>
            </TouchableOpacity>
        </View>

    );
};

const ModifyFileAddButton = ({detailPlanId, onPressModifyButton}) => {
    return (
        <View style={styles.button_group_container}>
            <TouchableOpacity style={styles.fix_button} onPress={() => onPressModifyButton(detailPlanId)}>
                <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.add_file_button}>
                <Text>파일 첨부</Text>
            </TouchableOpacity>
        </View>
    )
}

const EvaluationButton = ({detailPlanId, isDislikeChecked, onPress}) => {
    return (
        <View style={styles.detail_dislike_button}>
            <TouchableOpacity onPress={() => onPress(detailPlanId, isDislikeChecked)}>
                <Icon
                    style={isDislikeChecked === false ? styles.default_detail_plan_thumb : styles.disliked_detail_plan_thumb}
                    name="thumbs-down"
                    size={hp(4)}
                />
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create(
    {

        outer_container: {
            width: wp(80),
            height: hp(16),
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: hp(1),
            borderWidth: 1,
            padding: "2%",
        },
        main_content_container: {

            width: "100%",
            height: "80%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
        },
        content_container: {
            width: "60%",
            height: "70%",
            justifyContent: "center",
        },
        content_text: {
            color: '#000000',
            textAlign: "left",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: "5%",
        },
        additional_info_text: {
            fontSize: 18,
        },
        detail_dislike_button: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        disliked_detail_plan_thumb: {
            color: "red",
        },
        default_detail_plan_thumb: {
            color: "#BFBFBF"
        },
        button_group_container: {
            height: "70%",
            width: "25%",
            justifyContent: "space-between",
            alignItems: "center",
        },
        fix_button: {
            backgroundColor: '#DFDFDF',
            width: "60%",
            height: "40%",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        add_file_button: {
            backgroundColor: '#DFDFDF',
            width: "100%",
            height: "40%",
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
    }
);
export default DetailPlanList;
