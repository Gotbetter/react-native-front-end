import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createRoom, fetchRules, onChangeRequest, resetRequest, resetStatus} from "../../../module/room";
import Toast from "react-native-root-toast";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Logo from "../../../components/common/Logo";
import ContinueButton from "../../../components/room/form/ContinueButton";
import InputGroup from "../../../components/room/form/InputGroup";

function RoomRulesFormScreen({navigation}) {
    const SCREEN_TITLE = "룰을 선택하세요";

    const dispatch = useDispatch();
    const {user, rules, loading, status, request} = useSelector(({auth, room}) => ({
        user: auth.user,
        rules: room.rules,
        loading: room.loading.RULES,
        status: room.status.ROOM_CREATE,
        request: room.request,
    }));

    const [selectedRule, setSelectedRule] = useState(null);
    const [selectedRuleContents, setSelectedRuleContents] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(fetchRules(user.access_token));
    }, [dispatch, user.access_token]);


    useEffect(() => {
        if (status === 201) {
            Toast.show('방 생성 완료', {duration: Toast.durations.LONG});
            dispatch(resetRequest());
            dispatch(resetStatus('ROOM_CREATE'));
            navigation.navigate('main');
        } else if (status === 403) {
            Toast.show('토큰 만료', {duration: Toast.durations.LONG});
        } else if (status === 400) {
            Toast.show('양식 이상함', {duration: Toast.durations.LONG});
        }
    }, [dispatch, status]);

    const onChange = (targetName, value) => {
        const next = {
            ...request,
            [targetName]: value,
        };
        dispatch(onChangeRequest(next));
    };

    const onSelectRule = (rule_id, contents) => {
        setSelectedRule(rule_id);
        setSelectedRuleContents(contents);
        const next = {
            ...request,
            ["rule_id"]: rule_id,
        };
        dispatch(onChangeRequest(next));
    };

    const onPress = useCallback(() => {
        const {rule_id} = request;

        if (rule_id === null) {
            Toast.show('룰을 선택하세요', {duration: Toast.durations.LONG});
        } else {
            setShow(true);
        }
    }, [request]);

    const onPressCreateRoom = useCallback(() => {
        const {account} = request;
        if (account.length === 0) {
            Toast.show('계좌번호를 입력하세요', {duration: Toast.durations.LONG});
        } else {
            // 방 생성
            dispatch(createRoom({accessToken: user.access_token, request}))
        }
    }, [dispatch,request]);

    if (loading) {
        return <Text>로딩중...</Text>;
    }

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                {rules && rules.map(rule => (
                    <TouchableOpacity
                        key={rule.rule_id}
                        style={[styles.rule_container, rule.rule_id === selectedRule && styles.rule_highlight]}
                        onPress={() => onSelectRule(rule.rule_id, rule.contents)}>
                        <Text suppressHighlighting={true} style={styles.rule_text}>
                            {rule.contents}
                        </Text>
                    </TouchableOpacity>
                ))}
                <ContinueButton name="계속하기" onPress={onPress}/>
            </View>
            {show && (
                <Modal isVisible={true}
                       transparent>
                    <View style={styles.modal_container}>
                        <View style={styles.modal_subinfo}>
                            <Text>스터디방 이름: {request.title}</Text>
                            <Text>스터디방 인원: {request.max_user_num}</Text>
                            <Text>스터디 시작일: {request.start_date.toLocaleDateString()}</Text>
                            <Text>스터디 기간: {request.week}주</Text>
                            <Text>스터디방 참가비: {request.entry_fee}</Text>
                            <Text>스터디방 규칙: {selectedRuleContents}</Text>
                        </View>
                        <View style={styles.modal_input_container}>
                            <InputGroup title={'계좌정보 입력'} targetName={'account'} onChange={onChange}/>
                        </View>
                        <View style={styles.modal_button_container}>
                            <ContinueButton name={'취소'} onPress={() => setShow(false)}/>
                            <ContinueButton name={'방 생성'} onPress={onPressCreateRoom}/>
                        </View>
                    </View>
                </Modal>

            )}


        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white',
        },

        content_container: {
            flex: 2,
            alignItems: "center",
        },

        screen_title: {
            alignItems: 'flex-start',
            fontSize: 22,
            width: '90%',
            fontWeight: 'bold',
        },

        rule_container: {
            width: "90%",
            height: 80,
            marginTop: 30,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',

            justifyContent: "center",
            alignItems: "center",
        },

        rule_highlight: {
            backgroundColor: '#D8D8D8',
        },
        rule_text: {
            fontSize: 18,
        },

        modal_container: {
            height: "60%",
            position: "absolute",
            top: "25%", left: 0, bottom: 0, right: 0,
            backgroundColor: 'white',
            justifyContent: "center",
            alignItems: "center",
        },

        modal_subinfo: {
            width: "90%",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
        },
        modal_input_container: {
            width: "90%"
        },
        modal_button_container: {
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-around",
        },



    }
);

export default RoomRulesFormScreen;
