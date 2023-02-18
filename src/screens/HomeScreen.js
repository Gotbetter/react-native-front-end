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
import Logo from "../components/common/Logo";
import {useRoute} from "@react-navigation/native";
import {fetchParticipants, fetchRoom} from "../module/room";
import {fetchUser} from "../module/auth";
import client from "../lib/client";
import Toast from "react-native-root-toast";

function HomeScreen({navigation}) {

    const {params: {room_id}} = useRoute();
    const dispatch = useDispatch();

    const user = useSelector(({auth}) => auth.user);

    const {room, rooms} = useSelector(({room}) => ({
        room: room.room,
        rooms: room.rooms,
    }));

    const {participants, fetchParticipantsStatus} = useSelector(({room}) => ({
        participants: room.participants,
        fetchParticipantsStatus: room.status
    }));

    const [authority, setAuthority] = useState(false);
    const [waitingParticipants, setWaitingParticipants] = useState([]);
    const [approvalModal, setApprovalModal] = useState(false);


    useEffect(() => {

        /** 로그인한 유저 정보 불러오기 **/
        dispatch(fetchUser());

        /** 현재 방 정보 불러오기 **/
        dispatch(fetchRoom({room_id}));

        /** 현재 방 참가자 정보 불러오기 **/
        dispatch(fetchParticipants({room_id, accepted: true}));
    }, [dispatch, room_id]);


    useEffect(() => {
        /** 방장인지 체크 **/
        if (user != null && participants != null) {
            participants.map((participants) => {
                if (participants.auth_id === user.auth_id) {
                    setAuthority(participants.authority);
                }
            });
        }
    }, [user, participants]);


    const onPressApproveParticipate = () => {
        setApprovalModal(true);

        /** 참여 대기중인 인원 불러오기 **/
        client.get(`/participants/${room_id}`,
            {
                params: {
                    accepted: false
                },
            })
            .then(({data}) => {
                setWaitingParticipants(data);
            })
            .catch(({config, message, response: {status}}) => {
                console.log(config);
                console.log(message, status)
            });
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

    const onPressPlans = useCallback((participant_id, username) => {
        navigation.navigate('my-plan', {participant_id, planned_name: username});
    }, []);

    /**
     * Dummy Data (GET Plan and Detail Plan)
     * 1. 주차 계획 조회
     * 2. 상세 계획 조회
     */
    const detail_plans = [
        {detail_plan_id: 1, content: 'UI/UX 디자인 방법들 연구', complete: false, plan_id: 1},
        {detail_plan_id: 2, content: '스터디 웹 서비스 UI/UX 디자인', complete: false, plan_id: 1},
        {detail_plan_id: 3, content: '새로운 개념의 SNS UI/UX 디자인', complete: false, plan_id: 1},
    ];
    const detail_plan_list = [];
    for (let i = 0; i < detail_plans.length; i++) {
        detail_plan_list.push(
            <View style={{
                flex: 1,
                key: detail_plans[i].detail_plan_id,
                justifyContent: 'center',
                marginLeft: '10%',
                marginRight: '10%',
            }}>
                <Text style={styles.detail_plan_text}>{detail_plans[i].content}</Text>
            </View>
        );
    }

    /*const participant_list_top = [];
    for (let i = 0; i < 2; i++) {
        if (participants[i] !== undefined) {
            participant_list_top.push(
                <View key={participants[i].participant_id} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.user}>
                        <Text style={styles.button_text}>{participants[i].username}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>
            )
        } else {
            participant_list_top.push(
                <View key={10000 + i} style={{flex: 1}}/>
            );
        }
    }*/
    /*const participant_list_middle = [];
    for (let i = 2; i < 4; i++) {
        if (participants[i] !== undefined) {
            participant_list_middle.push(
                <View key={participants[i].participant_id} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.user}>
                        <Text style={styles.button_text}>{participants[i].username}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>
            )
        } else {
            participant_list_middle.push(
                <View key={10000 + i} style={{flex: 1}}/>
            );
        }
    }
    const participant_list_bottom = [];
    for (let i = 4; i < 6; i++) {
        if (participants[i] !== undefined) {
            participant_list_bottom.push(
                <View key={participants[i].participant_id} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.user}>
                        <Text style={styles.button_text}>{participants[i].username}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>
            )
        } else {
            participant_list_bottom.push(
                <View key={10000 + i} style={{flex: 1}}/>
            );
        }
    }*/


    return (
        <View style={styles.container}>
            <View style={{flex: 1}}/>

            <View style={{flex: 1}}>
                <Logo/>
            </View>

            <View style={{flex: 0.1}}/>
            <View style={styles.myRoomContainer}>
                {rooms &&
                    rooms.map((room) => (
                        <View key={room.room_id} style={{flex: 1, alignItems: 'center'}}>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity
                                style={room.room_id === room_id ? styles.current_room : styles.room}
                                onPress={() => navigation.navigate('home', {room_id: room.room_id})}>
                                <Text
                                    style={room.room_id === room_id ? styles.current_button_text : styles.button_text}>
                                    {room.title}
                                </Text>
                            </TouchableOpacity>
                            <View style={{flex: 1}}/>
                        </View>
                    ))
                }
            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.1}}/>
            <View style={styles.topBar}>
                <View style={{
                    flex: 1.5,
                    backgroundColor: '#EDEDED',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flexDirection: 'row'
                }}>

                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text
                        style={styles.main_text}>랭킹</Text>
                    </View>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text
                        style={styles.main_text}>룰</Text>
                    </View>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        {
                            authority &&
                            (
                                <Text style={styles.main_text} onPress={() => onPressApproveParticipate()}>
                                    참가 승인
                                </Text>

                            )
                        }
                    </View>
                    <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}><Text
                        style={styles.main_text}>환급 비용 계산</Text>
                    </View>

                </View>
                <View style={{flex: 1, flexDirection: 'row',}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 20}}>이번주 D - 5일</Text>
                    </View>
                    <View style={{flex: 0.01, backgroundColor: 'white'}}/>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 20}}>스터디 D- 4 주</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.25}}/>
            <View style={{flex: 4.75, width: '95%', alignSelf: 'center', flexDirection: 'row'}}>

                {/* 나의 이번주 계획 */}
                <View style={{flex: 1, backgroundColor: 'tomato', borderRadius: 20}}>
                    <View style={{
                        flex: 1.5,
                        backgroundColor: '#BFBFBF',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 15}}>나의 이번주 계획</Text>
                    </View>
                    <View style={{
                        flex: 8.5,
                        backgroundColor: '#EDEDED',
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {detail_plan_list}
                    </View>
                </View>

                <View style={{flex: 0.05, backgroundColor: 'white'}}/>

                {/* 친구들과 나의 계획 */}
                <View style={{flex: 1, backgroundColor: 'tomato', borderRadius: 20}}>
                    <View style={{
                        flex: 1.5,
                        backgroundColor: '#BFBFBF',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 15}}>친구들과 나의 계획</Text>
                    </View>
                    <View style={{
                        flex: 8.5,
                        backgroundColor: '#EDEDED',
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {participants && (
                                participants.map((participant, i) => (
                                    <View key={participant.participant_id} style={{flex: 1, alignItems: 'center'}}>
                                        <View style={{flex: 1}}/>
                                        <TouchableOpacity style={styles.user} onPress={() => onPressPlans(participant.participant_id, participant.username)}>
                                            <Text style={styles.button_text}>{participant.username}</Text>
                                        </TouchableOpacity>
                                        <View style={{flex: 1}}/>
                                    </View>
                                ))
                            )}
                        </View>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {/*{participant_list_middle}*/}
                        </View>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {/*{participant_list_bottom}*/}
                        </View>
                        <View style={{flex: 0.1}}/>
                    </View>
                </View>
            </View>
            <View style={{flex: 0.5}}/>

            <Modal
                animationType="slide"
                transparent={true}
                visible={approvalModal}
                onRequestClose={() => {
                    setApprovalModal(!approvalModal);
                }}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{
                        backgroundColor: '#EDEDED',
                        width: '90%',
                        height: '30%',
                        borderRadius: 30,
                        borderWidth: 5,
                        borderColor: '#DBDBDB'
                    }}>
                        <View style={{
                            flex: 4,
                            backgroundColor: 'white',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            justifyContent: 'center',
                        }}>
                            <Text style={styles.modal_text}>
                                대기자
                            </Text>
                            {waitingParticipants && (
                                waitingParticipants.map((participants) => (
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.modal_text}>
                                            {participants.username}
                                        </Text>
                                        <Button title={'승인'}
                                                onPress={() => onPressApproval(participants.user_id, participants.participant_id)}/>
                                    </View>

                                ))
                            )}
                        </View>
                        <TouchableOpacity onPress={() => setApprovalModal(false)}
                                          style={{flex: 1, alignItems: 'center'}}>
                            <Text style={styles.modal_text}>
                                닫기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );

}


const Participants = () => {

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
    room: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center',
    },
    button_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
    },
    current_room: {
        flex: 8,
        backgroundColor: '#000000',
        width: '90%',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center',
    },
    current_button_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
    },
    main_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
    },
    detail_plan_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 17.5,
    },
    user: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center',
    },
    modal_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 30,
    },
});

export default HomeScreen;
