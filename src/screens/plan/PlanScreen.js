import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {BASE_BACKGROUND} from "../../const/color";
import Header from "../../components/common/Header";
import WeekList from "../../components/plans/plan/WeekList";
import DislikeEvaluation from "../../components/plans/plan/DislikeEvaluation";
import DetailPlanList from "../../components/plans/detail/DetailPlanList";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import DetailPlanInputButton from "../../components/plans/detail/DetailPlanInput";
import InputModal from "../../components/plans/detail/InputModal";
import {useRoute} from "@react-navigation/native";
import {useFetchPlanAndDetailPlans, usePlanner} from "../../hooks/plan";
import {useDispatch, useSelector} from "react-redux";
import {
    cancelDislikeDetailPlan,
    cancelPlanDislike, completeDetailPlan,
    createDetailPlan, doDetailPlanDislike,
    doPlanDislike,
    modifyDetailPlan, undoCompleteDetailPlan
} from "../../module/plan";
import DislikeCount from "../../components/plans/common/DislikeCount";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";


function PlanScreen({}) {

    const {params: {planner, roomInfo}} = useRoute();
    const dispatch = useDispatch();
    const {participants} = useSelector(({room}) => room);

    /**
     * 버튼 클릭 관련 state
     * 세부 계획 추가 버튼
     * 수정 버튼
     * 세부 게획 체크 박스
     */
    const [addPressed, setAddPressed] = useState(false);
    const [modifyPressed, setModifyPressed] = useState(false);
    const [checkBoxPressed, setCheckBoxPressed] = useState(false);

    /**
     * weekList 관련 state
     * 출력될 주차를 담을 배열
     * 누른 주차 정보
     * 다음 주차 버튼을 누른 횟수
     */
    const [weekList, setWeekList] = useState(null);
    const [pressedWeek, setPressedWeek] = useState(roomInfo.current_week < roomInfo.week ? roomInfo.current_week : roomInfo.week);
    const [weekOffset, setWeekOffset] = useState(roomInfo.current_week < roomInfo.week ? Math.floor((roomInfo.current_week) / 5) : Math.floor((roomInfo.week) / 5));

    /**
     * 세부 계획 관련 state
     * 세부 계획 생성/삭제 request
     * 세부 계획 완료 메세지
     * 수정할 세부계획 id
     */
    const [content, setContent] = useState("");
    const [approveComment, setApproveComment] = useState("");
    const [modifyTargetId, setModifyTargetId] = useState(-1);
    const [completeTargetId, setCompleteTargetId] = useState(-1);

    /** 세부 계획 입력 모달 **/
    const [showInputModal, setShowInputModal] = useState(false);

    /**
     * custom hook
     * 나의 계획인지 확인
     * 계획, 세부계획 정보 불러오기
    **/
    const isMyPlan = usePlanner(planner);
    const [plan, planDislikeInfo, detailPlans] = useFetchPlanAndDetailPlans(planner.participant_id, pressedWeek);


    useEffect(() => {

        let week = [];
        for (let i = 1; i <= roomInfo.week; i++) {
            week.push(i);
        }

        function splitIntoChunk(arr, chunk) {
            // 빈 배열 생성
            const result = [];

            for (let index = 0; index < arr.length; index += chunk) {
                let tempArray;
                // slice() 메서드를 사용하여 특정 길이만큼 배열을 분리함
                tempArray = arr.slice(index, index + chunk);
                // 빈 배열에 특정 길이만큼 분리된 배열을 추가
                result.push(tempArray);
            }
            return result;
        }

        setWeekList(splitIntoChunk(week, 4));

    }, [planner, roomInfo]);

    /** 주차 선택 **/
    const onPressWeek = (week) => {
        if (week <= roomInfo.current_week) {
            setPressedWeek(week);
        }
    }
    /** 다음 주차 선택 **/
    const onPressNext = () => {
        if (weekOffset < Math.floor((roomInfo.week + 1) / 5)) {
            setWeekOffset(weekOffset + 1);
        }
    };
    /** 이전 주차 선택 **/
    const onPressBefore = () => {
        if (weekOffset > 0) {
            setWeekOffset(weekOffset - 1);
        }
    };
    /** 세부 계획 수정 버튼 선택 **/
    const onPressModify = (detail_plan_id) => {

        setModifyTargetId(detail_plan_id);
        let targetIndex = detailPlans.findIndex(detailPlan => detailPlan.detail_plan_id === detail_plan_id);
        setContent(detailPlans[targetIndex].content);

        setShowInputModal(true);
        setAddPressed(false);
        setModifyPressed(true);
    };
    /** 세부 계획 추가 버튼 선택 **/
    const onPressAdd = () => {
        setContent("");
        setShowInputModal(true);
        setAddPressed(true);
        setModifyPressed(false);
    };
    /** 입력 수정 모달 확인 **/
    const onConfirm = () => {
        const {plan_id} = plan;
        if (addPressed) {
            dispatch(createDetailPlan({plan_id, content}));
            setAddPressed(false);
        } else if (modifyPressed && modifyTargetId !== -1) {
            dispatch(modifyDetailPlan({plan_id, detail_plan_id: modifyTargetId, content}));
            setModifyPressed(false);
            setModifyTargetId(-1);
        } else if (checkBoxPressed) {
            dispatch(completeDetailPlan({plan_id, detail_plan_id: completeTargetId, approveComment}))
            setShowInputModal(false);
            setCheckBoxPressed(false);
            setApproveComment("");
        }
        setContent("");
        setShowInputModal(false);
    };
    /** 계획 평가 **/
    const onPressPlanDislike = () => {

        if (isMyPlan) {
            return null;
        }

        if (plan.three_days_passed) {
            return null;
        }

        if (planDislikeInfo.checked) {
            dispatch(cancelPlanDislike(plan.plan_id));
        } else {
            dispatch(doPlanDislike(plan.plan_id));
        }
    };
    /** 세부 계획 평가 **/
    const onPressDetailPlanDislike = (detail_plan_id, checked) => {

        if (checked) {
            dispatch(cancelDislikeDetailPlan(detail_plan_id));
        } else {
            dispatch(doDetailPlanDislike(detail_plan_id));
        }
    };
    /** 세부 계획 체크 박스 **/
    const onPressDetailPlanCheckBox = (detail_plan_id, comment, checked) => {
        const {plan_id} = plan;

        if (checked) {
            dispatch(undoCompleteDetailPlan({plan_id, detail_plan_id}));
        } else {
            setShowInputModal(true);
            setApproveComment(comment);
            setCompleteTargetId(detail_plan_id);
            setCheckBoxPressed(true);
        }
        console.log(approveComment);
    };
    const onCancelInputModal = () => {
        if (addPressed) {
            setAddPressed(false);
        }
        if (modifyPressed) {
            setModifyPressed(false);
        }
        if (checkBoxPressed) {
            setCheckBoxPressed(false);
        }

        setShowInputModal(false);
    }

    return (
        <View style={styles.container}>
            <Header onPress={null}/>
            {
                weekList && <WeekList onPress={onPressWeek} pressedWeek={pressedWeek}
                                      currentWeek={roomInfo.current_week} weekList={weekList[weekOffset]}
                                      onPressNext={onPressNext} onPressBefore={onPressBefore}/>
            }
            <View style={styles.content_container}>
                <ScrollView contentContainerStyle={styles.scroll_wrapper}>
                    <Text style={styles.planner_text}>{planner.username}</Text>
                    {
                        detailPlans && participants && plan &&
                        <DetailPlanList isMyPlan={isMyPlan}
                                        onPressDetailPlanCheckBox={onPressDetailPlanCheckBox}
                                        onPressDetailPlanDislike={onPressDetailPlanDislike}
                                        threeDaysPassed={plan.three_days_passed}
                                        detailPlans={detailPlans}
                                        participantsCount={participants.length - 1}
                                        onPressModify={onPressModify}
                        />
                    }
                    {
                        plan && plan.three_days_passed === false && isMyPlan === true ?
                            <DetailPlanInputButton onPress={onPressAdd}/> : null
                    }

                </ScrollView>
            </View>
            <View style={styles.plan_dislike_container}>
                {planDislikeInfo && <DislikeEvaluation onPress={onPressPlanDislike}
                                                       isMyPlan={isMyPlan}
                                                       checked={planDislikeInfo.checked}
                                                       size={hp(6)}/>
                }
                {
                    planDislikeInfo && <DislikeCount dislikeCount={planDislikeInfo.dislike_count}
                                                     participantsCount={participants.length - 1}/>
                }
            </View>

            <InputModal show={showInputModal}
                        content={(addPressed || modifyPressed) ? content : approveComment}
                        title={addPressed ? "세부계획 추가하기" : modifyPressed ? "세부계획 수정하기" : checkBoxPressed ? "세부계획 완료 메세지" : ""}
                        onCancel={onCancelInputModal}
                        onConfirm={onConfirm}
                        onChangeText={(text) => (addPressed || modifyPressed) ? setContent(text) : setApproveComment(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: BASE_BACKGROUND
        },
        content_container: {
            height: "70%",
            width: "100%",

        },
        scroll_wrapper: {
            width: "100%",
            padding: wp(5),


        },

        plan_dislike_container: {
            width: "100%",
            height: "12%",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
        },

        planner_text: {
            fontSize: 24,
            fontWeight: "bold"
        }

    }
)

export default PlanScreen;
