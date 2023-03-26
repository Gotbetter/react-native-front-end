import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createRoom, fetchRules, onChangeRoomRequest, resetRoomCreateRequest, resetStatus} from "../../../module/room";
import Toast from "react-native-root-toast";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Logo from "../../../components/common/Logo";
import NextOrCloseButton from "../../../components/room/form/NextOrCloseButton";
import InputGroup from "../../../components/room/form/InputGroup";

function RoomRulesFormScreen({navigation}) {
    const SCREEN_TITLE = "룰을 선택하세요";

    const dispatch = useDispatch();
    const {rules, status, request} = useSelector(({room}) => ({
        rules: room.roomRules,
        status: room.status.ROOM_CREATE,
        request: room.roomRequest,
    }));

    const [selectedRule, setSelectedRule] = useState(1);
    const [selectedRuleContents, setSelectedRuleContents] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(fetchRules());
    }, [dispatch]);


    useEffect(() => {
        if (status === 201) {
            navigation.navigate('room-create-result-screen',{selectedRuleContents});
            setShow(false);
            dispatch(resetStatus('ROOM_CREATE'));
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
        dispatch(onChangeRoomRequest(next));
    };

    const onSelectRule = (rule_id, contents) => {
        setSelectedRule(rule_id);
        setSelectedRuleContents(contents);
        const next = {
            ...request,
            ["rule_id"]: rule_id,
        };
        dispatch(onChangeRoomRequest(next));
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
            dispatch(createRoom(request))
        }
    }, [dispatch,request]);


    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                {rules && rules.map(rule => (
                    <TouchableOpacity
                        key={rule.rule_id}
                        style={[styles.rule_container, rule.rule_id === selectedRule && styles.rule_highlight]}>
                        <Text suppressHighlighting={true} style={styles.rule_text}>
                            {rule.contents}
                        </Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.button_container}>
                    <NextOrCloseButton name="계속하기" onPress={onPress}/>
                </View>

            </View>
            {show && (
                <Modal isVisible={true}
                       transparent>
                    <View style={styles.modal_container}>
                        <InputGroup title={'계좌정보 입력'} targetName={'account'} onChange={onChange}/>
                        <View style={styles.modal_button_group_container}>
                            <View style={styles.modal_button_container}>
                                <NextOrCloseButton name={'취소'} onPress={() => setShow(false)}/>
                            </View>
                            <View style={styles.modal_button_container}>
                                <NextOrCloseButton name={'방 생성'} onPress={onPressCreateRoom}/>
                            </View>

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
        button_container: {
            marginTop: "10%",
            width: "30%",
            height: "10%",
        },
        modal_container: {
            height: "100%",
            width: "100%",
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
        modal_button_group_container: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "10%",
            width: "80%",
            height: "8%"
        },
        modal_button_container: {
            width: "40%",
            height: "100%",
        },



    }
);

export default RoomRulesFormScreen;
