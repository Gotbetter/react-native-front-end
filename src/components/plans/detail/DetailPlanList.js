import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckIcon from "react-native-vector-icons/Fontisto";

// 화면 비율 맞추기 위한 lib
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Entypo";

function DetailPlanList({isMyPlan, detailPlans, onPressCheckBox, onPressModifyButton, setAddButtonPressed, setModifyButtonPressed}) {

    return (
        detailPlans.map((detailPlan) => (
            <View style={styles.detail_plan} key={detailPlan.detail_plan_id}>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <CheckBox complete={detailPlan.complete}
                              onPressCheckBox={isMyPlan === true ? onPressCheckBox : null}
                    />
                </View>
                <View style={{flex: 6}}>
                    <DetailPlanItem content={detailPlan.content}
                    />
                </View>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        isMyPlan !== true ?
                            <EvaluationButton/> : <ModifyFileAddButton detailPlanId={detailPlan.detail_plan_id}
                                                                       onPressModifyButton={onPressModifyButton}
                                                                       setAddButtonPressed={setAddButtonPressed}
                                                                       setModifyButtonPressed={setModifyButtonPressed}/>
                    }
                </View>

            </View>
        ))
    );

}

const DetailPlanItem = ({content}) => {
    return <Text style={styles.detail_plan_text}>{content}</Text>
};

const CheckBox = ({complete, onPressCheckBox}) => {
    return (
        complete === true ?
            (
                <TouchableOpacity onPress={() => onPressCheckBox()}>
                    <CheckIcon name="checkbox-active" size={wp(5)}/>
                </TouchableOpacity>
            ) :
            (
                <TouchableOpacity onPress={() => onPressCheckBox()}>
                    <CheckIcon name="checkbox-passive" size={wp(5)}/>
                </TouchableOpacity>
            )
    );
};

const ModifyFileAddButton = ({detailPlanId, onPressModifyButton, setAddButtonPressed,setModifyButtonPressed}) => {
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

const EvaluationButton = () => {
    return (
        <View style={styles.detail_dislike_button}>
            <TouchableOpacity>
                <Icon name="thumbs-down" color="#BFBFBF" size={hp(4)}/>
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
