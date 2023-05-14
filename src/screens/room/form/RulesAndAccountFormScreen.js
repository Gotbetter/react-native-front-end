import React, {useEffect, useMemo, useState} from 'react';
import CreateRoomTemplate from "../../../components/room/form/CreateRoomTemplate";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Shadow} from "react-native-shadow-2";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {createRoom, fetchRules, onChangeRoomRequest, resetStatus} from "../../../module/room";
import {useDispatch, useSelector} from "react-redux";
import ErrorMessage from "../../../components/common/ErrorMessage";
import {useNavigation} from "@react-navigation/native";

function RulesAndAccountFormScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {rules, status, request} = useSelector(({room}) => ({
        rules: room.roomRules,
        status: room.status.ROOM_CREATE,
        request: room.roomRequest,
    }));

    const [selectedRule, setSelectedRule] = useState(1);

    /** 계좌 정보 예외 **/
    const [accountError, setAccountError] = useState(false);
    /** 예외 처리 메시지 **/
    const errorMessage = useMemo(() => "필수 요소입니다.", []);

    useEffect(() => {
        dispatch(fetchRules());
    }, [dispatch]);

    useEffect(() => {
        if (status === 201) {
            navigation.navigate('main');
            dispatch(resetStatus('ROOM_CREATE'));
        }
    }, [dispatch, status]);

    const onChange = (targetName, value) => {
        const next = {
            ...request,
            [targetName]: value,
        };
        dispatch(onChangeRoomRequest(next));
    };
    /** 만들기 **/
    const onPressCreate = () => {
        const {account} = request;
        if (account.length === 0) {
            setAccountError(true);
        } else {
            // 방 생성
            dispatch(createRoom(request));
        }
    };

    return (
        <CreateRoomTemplate>
            <View style={styles.content_container}>
                <View style={styles.rule_group}>
                    <Text style={styles.input_title}>스터디룸 규칙</Text>
                    {
                        rules.map(rule => (
                            <TouchableOpacity
                                style={[styles.rule, selectedRule === rule.rule_id ? styles.selected_rule : null]}
                                key={rule.rule_id}>
                                <Text
                                    style={[styles.text, selectedRule === rule.rule_id ? styles.highlight_text : null]}>
                                    {rule.contents}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={styles.input_group}>
                    <Text style={styles.input_title}>계좌 정보</Text>
                    <Shadow style={{width: "100%"}} {...styles.shadow}>
                        <TextInput style={[styles.input]} maxLength={50} value={request.account} onChangeText={(text) => onChange("account", text)}/>
                    </Shadow>
                </View>
                {accountError && <ErrorMessage message={errorMessage}/> }
                <TouchableOpacity style={styles.button} onPress={() => onPressCreate()}>
                    <Text style={styles.highlight_text}>만들기</Text>
                </TouchableOpacity>
            </View>
        </CreateRoomTemplate>
    );
}

const styles = StyleSheet.create(
    {
        shadow: {
            distance: 0,
            offset: [0, 5]
        },
        content_container: {
            alignSelf: "center",
            justifyContent: "space-between",
            width: "80%",
            height: "50%",
            marginTop: "10%",
        },
        rule_group: {
            width: "100%",
            height: "60%",
            justifyContent: "space-around",
        },
        input_group: {
            width: "100%",
            justifyContent: "space-around",
            height: hp(10),
        },
        input_title: {
            fontWeight: "bold",
            fontSize: 18,
        },
        input: {
            width: "100%",
            padding: wp(2),
            height: hp(5),
            backgroundColor: "#ffffff",
        },
        rule: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: "100%",
            height: "30%"
        },
        button: {
            height: "12%",
            backgroundColor: "#262A2D",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
        },
        text: {
            color: "#000",
            fontSize: 18,
        },
        highlight_text: {
            color: "#fff",
        },
        selected_rule: {
            backgroundColor: "#000",
        },



    }
);

export default RulesAndAccountFormScreen;
