import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {BASE_BACKGROUND} from "../../const/color";
import Header from "../../components/common/Header";
import WeekList from "../../components/plans/plan/WeekList";
import DislikeEvaluation from "../../components/plans/plan/DislikeEvaluation";
import DetailPlanList from "../../components/plans/detail/DetailPlanList";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import DetailPlanInput from "../../components/plans/detail/DetailPlanInput";
import InputModal from "../../components/plans/detail/InputModal";
import {useRoute} from "@react-navigation/native";
import {useFetchPlanAndDetailPlans, usePlanner} from "../../hooks/plan";
import {useDispatch, useSelector} from "react-redux";
import {createDetailPlan, modifyDetailPlan} from "../../module/plan";


function PlanScreen({}) {

    const {params: {planner, roomInfo}} = useRoute();
    const dispatch = useDispatch();

    const {participants} = useSelector(({room}) => room);

    /** 세부 계획 추가 버튼 누르면 true **/
    const [addPressed, setAddPressed] = useState(false);
    /** 수정 버튼 누르면 true **/
    const [modifyPressed, setModifyPressed] = useState(false);
    /** 클릭한 주차(기본 값 현재 주차)**/
    const [pressedWeek, setPressedWeek] = useState(roomInfo.current_week < roomInfo.week ? roomInfo.current_week : roomInfo.week);
    /** 세부 계획 입력 모달 **/
    const [showInputModal, setShowInputModal] = useState(false);
    /** 주차 리스트 **/
    const [weekList, setWeekList] = useState(null);
    const [weekOffset, setWeekOffset] = useState(roomInfo.current_week < roomInfo.week ? Math.floor((roomInfo.current_week) / 5) : Math.floor((roomInfo.week) / 5));
    /** 나의 계획인지 확인 **/
    const isMyPlan = usePlanner(planner.participant_id);
    /** 계획, 세부계획 정보 불러오기 **/
    const [plan, planDislikeInfo, detailPlans] = useFetchPlanAndDetailPlans(planner.participant_id, pressedWeek);

    /** 세부 계획 생성/삭제 request **/
    const [content, setContent] = useState("");
    /** 수정 할 세부계획 id **/
    const [modifyTarget, setModifyTarget] = useState();

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
        setModifyTarget(detail_plan_id);
        setShowInputModal(true);
        setAddPressed(false);
        setModifyPressed(true);
    };
    /** 세부 계획 추가 버튼 선택 **/
    const onPressAdd = () => {
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
        } else if (modifyPressed) {
            dispatch(modifyDetailPlan({plan_id, detail_plan_id: modifyTarget, content}));
            setModifyPressed(false);
        }
        setContent("");
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
                        detailPlans && participants &&
                        <DetailPlanList detailPlans={detailPlans}
                                        participantsCount={participants.length - 1}
                                        onPressModify={onPressModify}
                        />
                    }
                    <DetailPlanInput onPress={onPressAdd}/>
                </ScrollView>
            </View>
            <View style={styles.plan_dislike_container}>
                <Text>계획 평가</Text>
                <DislikeEvaluation/>
                <Text>{planDislikeInfo.dislike_count}/{participants.length-1}</Text>
            </View>
            <InputModal show={showInputModal}
                        title={addPressed ? "세부계획 추가하기" : modifyPressed ? "세부계획 수정하기" : ""}
                        onCancel={() => setShowInputModal(false)}
                        onConfirm={onConfirm}
                        onChangeText={(text) => setContent(text)}
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
