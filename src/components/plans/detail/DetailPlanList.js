import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckIcon from "react-native-vector-icons/Fontisto";

// 화면 비율 맞추기 위한 lib
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Entypo";
import InputModal from "../../common/InputModal";

function DetailPlanList({
                            isMyPlan,
                            detailPlans,
                            onPressCheckBox,
                            onPressModifyButton,
                            setAddButtonPressed,
                            setModifyButtonPressed,
                            onPressDetailPlanDislike,

                        }) {

    return (
        detailPlans.map((detailPlan) => (
            <View style={styles.detail_plan} key={detailPlan.detail_plan_id}>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        isMyPlan !== true ?
                            <View/> : <CheckBox detailPlanId={detailPlan.detail_plan_id}
                                                complete={detailPlan.complete}
                                                onPressCheckBox={onPressCheckBox}
                            />
                    }
                </View>
                <View style={{flex: 6}}>
                    <DetailPlanItem content={detailPlan.content}/>
                    <Text>{detailPlan.approve_comment}</Text>
                </View>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        isMyPlan !== true ?
                            <EvaluationButton detailPlanId={detailPlan.detail_plan_id}
                                              isDislikeChecked={detailPlan.detail_plan_dislike_checked}
                                              onPress={onPressDetailPlanDislike}/> :
                            <ModifyFileAddButton detailPlanId={detailPlan.detail_plan_id}
                                                 onPressModifyButton={onPressModifyButton}
                                                 setAddButtonPressed={setAddButtonPressed}
                                                 setModifyButtonPressed={setModifyButtonPressed}/>
                    }
                </View>
            </View>

        ))
    )
        ;

}

const DetailPlanItem = ({content}) => {
    return <Text style={styles.detail_plan_text}>{content}</Text>
};

const CheckBox = ({detailPlanId, complete, onPressCheckBox}) => {
    return (
        <TouchableOpacity onPress={() => onPressCheckBox(complete, detailPlanId)}>
            <CheckIcon name={complete === true ? "checkbox-active" : "checkbox-passive"} size={wp(5)}/>
        </TouchableOpacity>
    );
};

const ModifyFileAddButton = ({detailPlanId, onPressModifyButton, setAddButtonPressed, setModifyButtonPressed}) => {
    return (
        <View style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => {
                onPressModifyButton(detailPlanId);
                setAddButtonPressed(false);
                setModifyButtonPressed(true);
            }}>
                <View style={styles.fix_button}>
                    <Text>수정</Text>
                </View>
            </TouchableOpacity>
            <View style={{height: hp(1)}}/>
            <TouchableOpacity>
                <View style={styles.add_file_button}>
                    <Text>파일 첨부</Text>
                </View>
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
        detail_plan: {
            flex: 1,
            width: wp(80),
            height: hp(10),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: hp(1),
            flexDirection: 'row',
            borderWidth: 1,

        },

        detail_plan_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 15,
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
        fix_button: {
            backgroundColor: '#DFDFDF',
            width: wp(12),
            height: wp(6),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            alignSelf: 'center',
        },
        add_file_button: {
            backgroundColor: '#DFDFDF',
            width: wp(15),
            height: wp(6),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            alignSelf: 'center',
        },
    }
);
export default DetailPlanList;
