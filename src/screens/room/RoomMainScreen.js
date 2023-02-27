import {
    Keyboard,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    TouchableOpacity, Modal, Button,
} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Logo from "../../components/common/Logo";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {
    fetchPlanAndDetailPlan,
    fetchRoom,
    fetchParticipants,
    resetPlanAndDetailPlan,
    fetchRooms
} from "../../module/room";
import client from "../../lib/client";
import Toast from "react-native-root-toast";
import RoomList from "../../components/room/main/RoomList";
import ToolBar from "../../components/room/main/ToolBar";
import CurrentWeekDetailPlan from "../../components/room/main/CurrentWeekDetailPlan";
import ParticipantsPlan from "../../components/room/main/ParticipantsPlan";
import ParticipationApproveModal from "../../components/room/main/ParticipationApproveModal";

function RoomMainScreen() {

    const {params: {room_id}} = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const user = useSelector(({auth}) => auth.user);
    const {roomList, roomInfo, detailPlans, participants, waitingParticipants} = useSelector(({room}) => room);

    const [authority, setAuthority] = useState(false);
    const [approvalModal, setApprovalModal] = useState(false);

    useEffect(() => {

        /** 현재 방 정보 불러오기 **/
        dispatch(fetchRoom({room_id}));

        /** 내가 만든 방  리스트 불러오기 **/
        dispatch(fetchRooms());

        /** 참가자 정보 불러오기 **/
        dispatch(fetchParticipants({room_id, accepted: true}));

        /** 방장인지 체크 **/
        if (user != null && participants != null) {
            participants.map((participants) => {
                if (participants.auth_id === user.auth_id) {
                    setAuthority(participants.authority);
                }
            });
        }

    }, [room_id, authority]);

    useEffect(() => {
        /** 나의 participant_id 찾기 **/
        if (isFocused == true) {
            if (participants.length !== 0) {
                let targetParticipantId = null;
                participants.forEach((participant) => {
                    if (participant.user_id === user.user_id) {
                        targetParticipantId = participant.participant_id;
                    }
                });

                /** 이번주 나의 세부 계획 불러오기 **/
                dispatch(fetchPlanAndDetailPlan({participant_id: targetParticipantId, week: roomInfo.current_week}));
            }
        }
    }, [isFocused]);


    const onPressApproveParticipate = () => {
        setApprovalModal(true);
        dispatch(fetchParticipants({room_id, accepted: false}))
    };

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
                const {participant_id} = data
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
            <View style={{flex: 1}}/>

            <View style={{flex: 1}}>
                <Logo/>
            </View>

            <View style={{flex: 0.1}}/>
            <View style={styles.myRoomContainer}>
                <RoomList rooms={roomList} curRoomId={room_id}/>
            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.1}}/>
            <View style={styles.topBar}>
                {
                    roomInfo && <ToolBar roomInfo={roomInfo} authority={authority} onPress={onPressApproveParticipate}/>
                }
            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.25}}/>
            <View style={{flex: 4.75, width: '95%', alignSelf: 'center', flexDirection: 'row'}}>

                <View style={{flex: 1, backgroundColor: 'tomato', borderRadius: 20}}>
                    {
                        detailPlans &&
                        <CurrentWeekDetailPlan detailPlans={detailPlans}/>
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
                waitingParticipants &&
                <ParticipationApproveModal approvalModal={approvalModal}
                                           setApprovalModal={setApprovalModal}
                                           waitingParticipants={waitingParticipants}
                                           onPressApproval={onPressApproval}/>
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
        // flex: 1.0 - 0.1 - 0.1
        flex: 0.8,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        width: '95%',
        flexDirection: 'row',
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

});

export default RoomMainScreen;
