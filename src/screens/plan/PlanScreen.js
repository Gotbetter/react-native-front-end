import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {BASE_BACKGROUND} from "../../const/color";
import Header from "../../components/common/Header";
import WeekList from "../../components/plans/plan/WeekList";
import DislikeEvaluation from "../../components/plans/plan/DislikeEvaluation";
import DetailPlanList from "../../components/plans/detail/DetailPlanList";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import DetailPlanInput from "../../components/plans/detail/DetailPlanInput";
import InputModal from "../../components/plans/detail/InputModal";


function PlanScreen({}) {


    const [showInputModal, setShowInputModal] = useState(false);

    /** 세부 계획 추가 버튼 누르면 true **/
    const [addPressed, setAddPressed] = useState(false);
    /** 수정 버튼 누르면 true **/
    const [modifyPressed, setModifyPressed] = useState(false);

    const items = [
        {
            id: 1,
            comment: "hello",
            detailPlan: "알고리즘 스터디",
            dislike_count: 4,
        },
        {
            id: 2,
            comment: "hello",
            detailPlan: "알고리즘 스터디",
            dislike_count: 4,
        },
        {
            id: 3,
            comment: "hello",
            detailPlan: "알고리즘 스터디",
            dislike_count: 4,
        },
        {
            id: 4,
            comment: "hello",
            detailPlan: "알고리즘 스터디",
            dislike_count: 4,
        },

    ];

    const onPressModify = () => {
        setShowInputModal(true);
        setAddPressed(false);
        setModifyPressed(true);
    };

    const onPressAdd = () => {
        setShowInputModal(true);
        setAddPressed(true);
        setModifyPressed(false);
    }


    return (
        <View style={styles.container}>
            <Header onPress={null}/>
            <WeekList/>
            <View style={styles.content_container}>
                <ScrollView contentContainerStyle={styles.scroll_wrapper}>
                    <Text style={styles.planner_text}>구름용의 계획</Text>
                    <DetailPlanList detailPlans={items} onPressModify={onPressModify}/>
                    <DetailPlanInput onPress={onPressAdd}/>
                </ScrollView>
            </View>
            <View style={styles.plan_dislike_container}>
                <Text>계획 평가</Text>
                <DislikeEvaluation/>
                <Text>2/5</Text>
            </View>
            <InputModal show={showInputModal}
                        onCancel={() => setShowInputModal(false)} onConfirm={null}
                        title={addPressed ? "세부계획 추가하기" : modifyPressed ? "세부계획 수정하기" : ""}
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
