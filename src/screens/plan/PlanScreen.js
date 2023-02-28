import {ScrollView, StyleSheet, View,} from "react-native";

import {useEffect, useState,} from "react";

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
    createDetailPlan,
    modifyDetailPlan,
    onChangeDetailPlanRequest,
    planDislike,
    planDislikeCancel,
    pressDislike,
    resetDetailPlanRequest,
} from "../../module/room";


export default function PlanScreen() {
    const dispatch = useDispatch();
    const {params: {planner}} = useRoute();

    const [isAddButtonPressed, setIsAddButtonPressed] = useState(false);
    const [isModifyButtonPressed, setIsModifyButtonPressed] = useState(false);
    const [modifyDetailPlanId, setModifyDetailPlanId] = useState(null);

    const {request} = useSelector(({room}) => ({request: room.detailPlanRequest}));

    const [weekList, clickedWeek, setClickedWeek] = useWeekSelector()
    const [plan, planDislikeInfo, detailPlans] = useFetchPlanAndDetailPlans(planner.participant_id, clickedWeek);
    const isMyPlan = usePlanner(planner);


    useEffect(() => {
        /** 추가하기 버튼 상태 초기화 **/
        setIsAddButtonPressed(false);
        /** 수정 버튼 상태 초기화 **/
        setIsModifyButtonPressed(false);

    }, [clickedWeek]);


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

    const onPressPlanDislike = () => {
        const {checked} = planDislikeInfo;
        console.log(checked);
        if (checked) {
            dispatch(planDislikeCancel(plan.plan_id));
        } else {
            dispatch(planDislike(plan.plan_id));
        }
        dispatch(pressDislike(checked));
    };

    return (
        <View style={styles.container}>

            <View style={{flex: 0.5}}/>
            <Logo/>
            <View style={{flex: 0.1}}/>

            <WeekList
                plannerName={planner.username}
                weekList={weekList}
                clickedWeek={clickedWeek}
                setClickedWeek={setClickedWeek}
            />

            <View style={{flex: 0.1}}/>

            <View style={styles.detail_plans_container}>
                <ScrollView style={{flex: 1,}}>
                    {
                        detailPlans &&
                        <DetailPlanList
                            isMyPlan={isMyPlan}
                            detailPlans={detailPlans}
                            setAddButtonPressed={setIsAddButtonPressed}
                            setModifyButtonPressed={setIsModifyButtonPressed}
                            onPressModifyButton={setModifyDetailPlanId}
                        />
                    }
                    {
                        isMyPlan && isMyPlan === true ?
                            (
                                plan && plan.three_days_passed === false ?
                                    (
                                        <DetailPlanInput
                                            isAddButtonPressed={isAddButtonPressed}
                                            isModifyButtonPressed={isModifyButtonPressed}
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
                        planDislikeInfo && <DislikeEvaluationCount planDislikeInfo={planDislikeInfo}/>
                        :
                        planDislikeInfo && <DislikeEvaluation onPress={onPressPlanDislike} planDislikeInfo={planDislikeInfo}/>
                }
            </View>

            <View style={{flex: 0.5}}/>
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
