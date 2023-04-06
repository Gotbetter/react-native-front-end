import {ScrollView, StyleSheet, Text, View,} from "react-native";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation, useRoute} from "@react-navigation/native";
import {addParticipant, approvalCompleted, fetchParticipants} from "../../module/room";
import client from "../../lib/client";
import Toast from "react-native-root-toast";
import {useFetchMyCurrentWeekDetailPlan, useFetchRoomInfo, useGetDayInfo, useRoomLeader} from "../../hooks/room";
import {BASE_BACKGROUND} from "../../const/color";
import Header from "../../components/common/Header";
import RoomFooter from "../../components/room/main/RoomFooter";
import WeekInfo from "../../components/room/main/WeekInfo";
import ParticipantsGroup from "../../components/room/main/ParticipantsGroup";
import CurrentWeekDetailPlan from "../../components/room/main/CurrentWeekDetailPlan";

function RoomMainScreen() {

    const {params: {room_id}} = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const {participants, waitingParticipants} = useSelector(({room}) => room);
    const {user} = useSelector(({auth}) => auth);

    const roomInfo = useFetchRoomInfo(room_id);
    const isRoomLeader = useRoomLeader();
    const detailPlans = useFetchMyCurrentWeekDetailPlan(room_id);
    const [curWeekLeftDay, studyWeekLeft] = useGetDayInfo();

    useEffect(() => {
        /** 참가자 정보 불러오기 **/
        dispatch(fetchParticipants({room_id, accepted: true}));

    }, [room_id]);

    const getMyParticipantId = () => {
        const {user_id} = user;
        let result;
        participants.forEach((participant) => {
            if (participant.user_id === user_id) {
                result = participant.participant_id;
            }
        });
        return result;
    }

    const onPressApproval = (user_id) => {
        // todo : Plan 생성 실패할 경우 참가승인도 취소해야함
        /** 참가 승인 **/
        client.patch(`/participants`,
            {
                user_id,
                room_id,
            })
            .then(({data}) => {
                /** 참가 승인이 성공했을 경우 해당 참가자의 주간 계획을 생성해주어야 한다. **/
                console.log(data);
                const {participant_id} = data;
                dispatch(approvalCompleted(user_id));
                dispatch(addParticipant(data));
                client.post(`/plans`,
                    {
                        participant_id
                    })
                    .then(({data}) => {
                        console.log('계획 생성 완료');
                    })
                    .catch(({message, config, response: {status}}) => {
                        console.log('계획생성 실패');
                        console.log(message, config);
                        if (status === 403) {
                            console.log('forbidden');
                        } else if (status === 404) {
                            console.log('존재하지 않는 사용자');
                        } else if (status === 409) {
                            console.log('이미 생성됨');
                        }
                    });
            })
            .catch(({message, config, response: {status}}) => {
                console.log(config);
                console.log(message, status)
                if (status === 403) {
                    Toast.show("forbidden", {duration: Toast.durations.SHORT})
                } else if (status === 404) {
                    Toast.show("해당 사용자 못찾음", {duration: Toast.durations.SHORT})
                }
            });
    }
    const onPressPlans = (participant) => {
        navigation.navigate('my-plan', {planner: participant});
    }

    return (
        <View style={styles.container}>
            <Header/>
            <View style={styles.scroll_wrapper}>
                <ScrollView contentContainerStyle={styles.content_scroll_container}>
                    <View style={styles.title_container}>
                        {/*roomTitle*/}
                        <Text style={styles.title_text}>공부하셨어?(베타테스터용)</Text>
                    </View>
                    <View style={styles.content_container}>
                        <WeekInfo totalWeek={4} currentWeek={3}/>
                        <ParticipantsGroup participants={null}/>
                        <CurrentWeekDetailPlan dateToFix={2} dateToEnd={4} detailPlans={null}/>
                    </View>
                </ScrollView>
            </View>
            <RoomFooter isReader={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: BASE_BACKGROUND,
    },
    scroll_wrapper: {
        width: "100%",
        height: "80%",
        borderColor: "black"
    },
    content_scroll_container: {
        width: "100%",
        alignSelf: "center",
        padding: 12,

    },
    content_container: {
        alignSelf: "center",
        width: "90%",
    },

    title_container: {
        width: "100%",
    },
    title_text: {
        fontSize: 20,
        fontWeight: "bold",
    },

});

export default RoomMainScreen;
