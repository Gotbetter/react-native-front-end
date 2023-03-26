import {ScrollView, StyleSheet, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Logo from "../../components/common/Logo";
import {useNavigation, useRoute} from "@react-navigation/native";
import {addParticipant, approvalCompleted, fetchParticipants, resetRoom} from "../../module/room";
import client from "../../lib/client";
import Toast from "react-native-root-toast";
import RoomList from "../../components/room/main/RoomList";
import DateInfo from "../../components/room/main/DateInfo";
import CurrentWeekDetailPlan from "../../components/room/main/CurrentWeekDetailPlan";
import ParticipantsPlan from "../../components/room/main/ParticipantsPlan";
import ParticipationApproveModal from "../../components/room/main/ParticipationApproveModal";
import {
    useFetchMyCurrentWeekDetailPlan,
    useFetchRoomInfo,
    useFetchRoomList,
    useGetDayInfo,
    useRoomLeader
} from "../../hooks/room";
import MenuList from "../../components/room/main/MenuList";
import RoomInfoModal from "../../components/room/main/RoomInfoModal";
import RankModal from "../../components/room/main/RankModal";
import RefundInfo from "../../components/room/main/RefundInfo";

function RoomMainScreen() {

    const {params: {room_id}} = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const {participants, waitingParticipants} = useSelector(({room}) => room);
    const {user} = useSelector(({auth}) => auth);

    const roomInfo = useFetchRoomInfo(room_id);
    const roomList = useFetchRoomList();
    const isRoomLeader = useRoomLeader();
    const detailPlans = useFetchMyCurrentWeekDetailPlan(room_id);
    const [curWeekLeftDay, studyWeekLeft] = useGetDayInfo();

    const [approvalModal, setApprovalModal] = useState(false);
    const [roomInfoModal, setRoomInfoModal] = useState(false);
    const [rankModal, setRankModal] = useState(false);

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

    const isRoomEnd = () => {
        const {week: totalWeek, current_week} = roomInfo;

        if (current_week >= totalWeek + 1) {
            return true
        }

        return false;

    };
    const onPressApproveParticipate = () => {
        setApprovalModal(true);
        dispatch(fetchParticipants({room_id, accepted: false}))
    };

    const onPressRank = () => {
        setRankModal(true);
    }

    const onPressRoomInfo = () => {
        setRoomInfoModal(true);
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

    const onPressRoomList = (room_id) => {
        if (roomInfo.room_id !== room_id) {
            dispatch(resetRoom());
            navigation.navigate('home', {room_id});
        }
    }
    const onPressPlans = (participant) => {
        navigation.navigate('my-plan', {planner: participant});
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}/>

            <View style={{flex: 1}}>
                <Logo/>
            </View>

            <View style={{flex: 0.1}}/>
            <View style={styles.myRoomContainer}>
                {
                    roomList &&
                    <ScrollView contentContainerStyle={styles.scroll_container} horizontal={true}>
                        <RoomList rooms={roomList} curRoomId={room_id} onPress={onPressRoomList}/>
                    </ScrollView>
                }
            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.1}}/>
            <View style={styles.topBar}>
                {/* 메뉴 리스트 */}
                <MenuList isRoomLeader={isRoomLeader} onPress={onPressApproveParticipate}
                          onPressRank={onPressRank}
                          onPressRoomInfo={onPressRoomInfo}/>
                <View style={{flex: 1, flexDirection: 'row',}}>
                    {
                        roomInfo && participants && isRoomEnd() === false ?
                            <DateInfo studyWeekLeft={studyWeekLeft} weekDayLeft={curWeekLeftDay}/>
                            : <RefundInfo roomInfo={roomInfo} participantId={getMyParticipantId()}/>
                    }
                </View>

            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.25}}/>
            <View style={{flex: 4.75, width: '95%', alignSelf: 'center', flexDirection: 'row'}}>

                <View style={{flex: 1, borderRadius: 20}}>
                    {
                        detailPlans && <CurrentWeekDetailPlan detailPlans={detailPlans}/>
                    }
                </View>

                <View style={{flex: 0.05, backgroundColor: 'white'}}/>

                <View style={{flex: 1, backgroundColor: 'tomato', borderRadius: 20}}>
                    {
                        participants && <ParticipantsPlan participants={participants} onPressPlans={onPressPlans}/>
                    }
                </View>
            </View>
            <View style={{flex: 0.5}}/>
            {
                waitingParticipants && roomInfo &&
                <ParticipationApproveModal roomInfo={roomInfo}
                                           approvalModal={approvalModal}
                                           setApprovalModal={setApprovalModal}
                                           waitingParticipants={waitingParticipants}
                                           onPressApproval={onPressApproval}/>
            }
            <RoomInfoModal show={roomInfoModal} setShow={setRoomInfoModal}/>
            {
                roomInfo && <RankModal room_id={roomInfo.room_id} show={rankModal} setShow={setRankModal}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    myRoomContainer: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        height: "6%",
        width: '95%',
        justifyContent: "center",
        alignSelf: 'center',
    },
    topBar: {
        // flex: 1.5 - 0.1 - 0.1
        flex: 1.3,
        backgroundColor: '#000000',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
    },
    scroll_container: {
        height: "100%",
        flexDirection: "row",
    }

});

export default RoomMainScreen;
