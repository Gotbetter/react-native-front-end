import {ScrollView, StyleSheet, View,} from "react-native";

import React, {useEffect, useState,} from "react";

// 화면 비율 맞추기 위한 lib
import {widthPercentageToDP as wp,} from 'react-native-responsive-screen';

import Logo from "../../components/common/Logo";
import {useRoute} from "@react-navigation/native";
import {DislikeEvaluationCount} from "../../components/plans/plan/DislikeEvaluationCount";
import DislikeEvaluation from "../../components/plans/plan/DislikeEvaluation";
import WeekList from "../../components/plans/plan/WeekList";
import DetailPlanInput from "../../components/plans/detail/DetailPlanInput";
import DetailPlanList from "../../components/plans/detail/DetailPlanList";
import {useFetchPlanAndDetailPlans, usePlanner, useWeekSelector} from "../../hooks/plan";
import {useDispatch, useSelector} from "react-redux";
import {
    cancelDetailPlanDislike,
    cancelPlanDislike,
    completeDetailPlan,
    createDetailPlan,
    doDetailPlanDislike,
    doPlanDislike,
    modifyDetailPlan,
    onChangeDetailPlanRequest,
    pressDislike,
    resetDetailPlanRequest,
    undoCompleteDetailPlan,
} from "../../module/room";
import InputModal from "../../components/common/InputModal";
import {useFetchRoomInfo} from "../../hooks/room";


export default function PlanScreen() {
    const dispatch = useDispatch();
    const {params: {planner}} = useRoute();

    const [isAddButtonPressed, setIsAddButtonPressed] = useState(false);
    const [isModifyButtonPressed, setIsModifyButtonPressed] = useState(false);
    const [modifyDetailPlanId, setModifyDetailPlanId] = useState(null);

    const {request, participants} = useSelector(({room}) => ({
        request: room.detailPlanRequest,
        participants: room.participants
    }));

    const {current_week} = useFetchRoomInfo();
    const [weekList, clickedWeek, setClickedWeek] = useWeekSelector()
    const [plan, planDislikeInfo, detailPlans] = useFetchPlanAndDetailPlans(planner.participant_id, clickedWeek);
    const isMyPlan = usePlanner(planner);

    const [isCompleted, setIsCompleted] = useState(null);
    const [completedDetailPlanId, setCompletedDetailPlanId] = useState(null);
    const [approveComment, setApproveComment] = useState('');
    const [openApproveCommentModal, setOpenApproveCommentModal] = useState(false);

    useEffect(() => {
        /** 추가하기 버튼 상태 초기화 **/
        setIsAddButtonPressed(false);
        /** 수정 버튼 상태 초기화 **/
        setIsModifyButtonPressed(false);

    }, [clickedWeek]);

    /** 세부계획 완료 체크 박스 **/
    const onPressCheckBox = (complete, detailPlanId) => {
        const {plan_id} = plan;
        if (doUnCheck(complete)) {
            dispatch(undoCompleteDetailPlan({plan_id, detail_plan_id: detailPlanId}));
        } else {
            setOpenApproveCommentModal(true);
        }
        setIsCompleted(complete);
        setCompletedDetailPlanId(detailPlanId);
    };

    const onPressEnter = () => {
        const {plan_id} = plan;
        if (doUnCheck(isCompleted)) {
            dispatch(undoCompleteDetailPlan({plan_id, detail_plan_id: completedDetailPlanId}));
        } else {
            dispatch(completeDetailPlan({plan_id, detail_plan_id: completedDetailPlanId, approveComment}));
        }
        setOpenApproveCommentModal(false);
        setApproveComment('');
    }

    const doUnCheck = (complete) => {
        return complete === true;
    }

    const onPressWeekList = (week) => {

        if (current_week >= week) {
            setClickedWeek(week);
        }
    }

    /** 세부계획 추가하기 버튼 **/
    const onPressAddDetailPlan = () => {
        if ('' != request) {
            dispatch(createDetailPlan({
                plan_id: plan.plan_id,
                content: request
            }));
            dispatch(resetDetailPlanRequest());
            setIsAddButtonPressed(false);
        }
    }

    /** 세부계획 수정하기 버튼 **/
    const onPressModifyDetailPlan = () => {
        if ('' != request) {
            dispatch(modifyDetailPlan({
                plan_id: plan.plan_id,
                detail_plan_id: modifyDetailPlanId,
                content: request
            }));
            dispatch(resetDetailPlanRequest());
            setIsModifyButtonPressed(false);
        }
    }

    const onChangeText = (text) => {
        dispatch(onChangeDetailPlanRequest(text));
    }

    /** 계획 싫어요 버튼 **/
    const onPressPlanDislike = () => {
        const {checked} = planDislikeInfo;
        if (checked) {
            dispatch(cancelPlanDislike(plan.plan_id));
        } else {
            dispatch(doPlanDislike(plan.plan_id));
        }
        dispatch(pressDislike(checked));
    };

    /** 세부계획 싫어요 버튼 **/
    const onPressDetailPlanDislike = (detail_plan_id, isChecked) => {

        if (cancelDislike(isChecked)) {
            dispatch(cancelDetailPlanDislike(detail_plan_id))
        } else {
            dispatch(doDetailPlanDislike(detail_plan_id))
        }
    }

    const cancelDislike = (isChecked) => {
        return isChecked === true;
    }

    return (
        <View style={styles.container}>

            <View style={{flex: 0.5}}/>
            <Logo/>
            <View style={{flex: 0.1}}/>

            <WeekList
                plannerName={planner.username}
                weekList={weekList}
                clickedWeek={clickedWeek}
                onPress={onPressWeekList}
            />

            <View style={{flex: 0.1}}/>

            <View style={styles.detail_plans_container}>
                <ScrollView style={{flex: 1,}}>
                    {
                        detailPlans && planDislikeInfo &&
                        <DetailPlanList
                            participantsCount={participants.length - 1}
                            planDislikeInfo={planDislikeInfo}
                            isMyPlan={isMyPlan}
                            detailPlans={detailPlans}
                            setAddButtonPressed={setIsAddButtonPressed}
                            setModifyButtonPressed={setIsModifyButtonPressed}
                            onPressModifyButton={setModifyDetailPlanId}
                            onPressCheckBox={onPressCheckBox}
                            onPressDetailPlanDislike={onPressDetailPlanDislike}
                        />
                    }
                    {
                        isMyPlan && isMyPlan === true ?
                            (
                                plan && plan.three_days_passed === false ?
                                    (
                                        <DetailPlanInput
                                            addButtonPressed={isAddButtonPressed}
                                            modifyButtonPressed={isModifyButtonPressed}
                                            setAddButtonPressed={setIsAddButtonPressed}
                                            setModifyButtonPressed={setIsModifyButtonPressed}
                                            onPressModifyDetailPlan={onPressModifyDetailPlan}
                                            onPressAddDetailPlan={onPressAddDetailPlan}
                                            onChangeRequest={onChangeText}
                                        />
                                    ) : null
                            )
                            : null
                    }
                </ScrollView>
            </View>
            <View style={{flex: 0.1}}/>
            <View style={{flex: 1, flexDirection: 'row',}}>
                {
                    isMyPlan && isMyPlan === true ?
                        planDislikeInfo && participants &&
                        <DislikeEvaluationCount participantsCount={participants.length - 1} planDislikeInfo={planDislikeInfo}/>
                        :
                        planDislikeInfo &&
                        <DislikeEvaluation onPress={onPressPlanDislike} planDislikeInfo={planDislikeInfo}/>
                }
            </View>
            <View style={{flex: 0.5}}/>

            <InputModal modalTitle={'Memo'} inputTitle={'메모 입력'} target={approveComment}
                        onChangeTarget={setApproveComment} show={openApproveCommentModal}
                        setShow={setOpenApproveCommentModal}
                        onPress={onPressEnter}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    detail_plans_container: {
        flex: 5.7,
        backgroundColor: '#FFFFFF',
        marginLeft: wp(5),
        marginRight: wp(5),
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#DFDFDF',
    },

});
