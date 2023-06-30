import {SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
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
import {useFetchMyCurrentWeekDetailPlan, useFetchParticipants, useFetchRoomInfo} from "../../hooks/room";
import {useFetchUser} from "../../hooks/auth";
import {RFValue} from "react-native-responsive-fontsize";

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

    /**
     * redux state width custom hooks
     * 유저 정보
     * 방 정보
     * 세부 계획
     */
    const myUserInfo = useFetchUser();
    const roomInfo = useFetchRoomInfo(room_id);
    const detailPlans = useFetchMyCurrentWeekDetailPlan(room_id);

    /**
     * redux state width useSelector
     * 참가자들
     * 참가 대기 유저들
     * 랭킹
     */
    const {participants, waitingParticipants, rank} = useSelector(({room}) => room);

    useEffect(() => {
        /** 참가자 정보 불러오기 **/
        dispatch(fetchParticipants({room_id, accepted: true}));
    }, [room_id]);

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

    /** 랭킹 불러오기 **/
    const onPressRankIcon = () => {
        setShowRankModal(true);
        dispatch(fetchRank(room_id));
    }

    /** 초대하기 아이콘 **/
    const onPressInviteIcon = () => {
        setShowInviteModal(true);
        dispatch(fetchParticipants({room_id, accepted: false}));
    }

    return (
        <SafeAreaView style={styles.container}>
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
                            showInvite={onPressInviteIcon}
                            showRank={onPressRankIcon}
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

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BASE_BACKGROUND,
    },
    scroll_wrapper: {
        flex: 3,
        alignSelf: "center",
    },
    content_scroll_container: {
        padding: RFValue(12),
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
