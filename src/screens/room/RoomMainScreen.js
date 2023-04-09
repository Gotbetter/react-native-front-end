import {ScrollView, StyleSheet, Text, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation, useRoute} from "@react-navigation/native";
import {approveEntrance, fetchParticipants, fetchRank, fetchRoom} from "../../module/room";
import {BASE_BACKGROUND} from "../../const/color";
import Header from "../../components/common/Header";
import RoomFooter from "../../components/room/main/RoomFooter";
import WeekInfo from "../../components/room/main/WeekInfo";
import ParticipantsGroup from "../../components/room/main/ParticipantsGroup";
import CurrentWeekDetailPlan from "../../components/room/main/CurrentWeekDetailPlan";
import RankModal from "../../components/room/main/RankModal";
import RoomInfoModal from "../../components/room/main/RoomInfoModal";
import ParticipationApproveModal from "../../components/room/main/ParticipationApproveModal";
import HelpModal from "../../components/room/main/HelpModal";
import {useFetchMyCurrentWeekDetailPlan} from "../../hooks/room";

function RoomMainScreen() {

    const {params: {room_id}} = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    /** 이 방의 방장인지 확인 **/
    const [isLeader, setIsLeader] = useState(null);
    const [myParticipantId, setMyParticipantId] = useState(null);

    /**
     * Modal 관련 state
     * 방 정보
     * 랭킹
     * 도움말
     * 초대 (방장 한테 만 보임)
     */
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showRankModal, setShowRankModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

    const {roomInfo, participants, waitingParticipants, rank} = useSelector(({room}) => room);
    const {user: myUserInfo} = useSelector(({auth}) => (auth));
    const detailPlans = useFetchMyCurrentWeekDetailPlan(room_id);

    useEffect(() => {
        /** 방 점보 불러오기 **/
        dispatch(fetchRoom({room_id}));
        /** 참가자 정보 불러오기 **/
        dispatch(fetchParticipants({room_id, accepted: true}));
        /** 랭킹 불러오기 **/
        dispatch(fetchRank(room_id));
    }, [room_id]);

    useEffect(() => {

        /** 랭킹 불러오기 **/
        if (showRankModal) {
            dispatch(fetchRank(room_id));
        }
        /** 참가 요청 대기자 정보 불러오기 **/
        if (showInviteModal) {
            dispatch(fetchParticipants({room_id, accepted: false}));
        }
    }, [showRankModal, showInviteModal]);

    useEffect(() => {
        /** 내가 현재 입장한 방의 방장이라면 true 리턴, 아니라면 false 리턴 **/
        participants.map((participant) => {
            if (participant.user_id === myUserInfo.user_id) {
                setIsLeader(participant.authority);
                setMyParticipantId(participant.participant_id);
            }
        });
    }, [dispatch, isLeader, myUserInfo, participants]);

    /** 초대 버튼 눌렀을 때 **/
    const onPressInvite = (user_id) => {
        dispatch(approveEntrance({user_id, room_id}));
    };

    return (
        <View style={styles.container}>
            <Header/>

            {/* main content */}
            <View style={styles.scroll_wrapper}>
                <ScrollView contentContainerStyle={styles.content_scroll_container}>
                    <View style={styles.title_container}>
                        {/*roomTitle*/}
                        {
                            roomInfo && <Text style={styles.title_text}>{roomInfo.title}</Text>
                        }
                    </View>
                    <View style={styles.content_container}>
                        {
                            roomInfo && <WeekInfo totalWeek={roomInfo.week} currentWeek={roomInfo.current_week}/>
                        }
                        {
                            participants && myParticipantId && <ParticipantsGroup
                                onPress={(user_id, participant_id, username) => navigation.navigate('my-plan', {
                                    planner: {
                                        user_id,
                                        participant_id,
                                        username
                                    }, roomInfo
                                })}
                                myParticipantId={myParticipantId}
                                participants={participants}/>
                        }
                        {
                            roomInfo && detailPlans &&
                            <CurrentWeekDetailPlan roomInfo={roomInfo} detailPlans={detailPlans}/>
                        }
                    </View>
                </ScrollView>
            </View>
            {
                <RoomFooter isLeader={isLeader}
                            showHelp={() => setShowHelpModal(true)}
                            showInfo={() => setShowInfoModal(true)}
                            showInvite={() => setShowInviteModal(true)}
                            showRank={() => setShowRankModal(true)}
                />
            }


            {/* Footer Modal */}
            <HelpModal show={showHelpModal} onPressClose={() => setShowHelpModal(false)}/>
            {
                roomInfo &&
                <RoomInfoModal roomInfo={roomInfo} show={showInfoModal} onPressClose={() => setShowInfoModal(false)}/>
            }
            {
                rank && <RankModal rank={rank} show={showRankModal} onPressClose={() => setShowRankModal(false)}/>
            }

            {
                waitingParticipants &&
                <ParticipationApproveModal waitingParticipants={waitingParticipants} show={showInviteModal}
                                           onPressClose={() => setShowInviteModal(false)}
                                           onConfirm={onPressInvite}/>
            }

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
