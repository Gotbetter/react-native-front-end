import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {Shadow} from "react-native-shadow-2";
import {AntDesign} from "@expo/vector-icons";
import CreateRoomTemplate from "../../../components/room/form/CreateRoomTemplate";
import {useNavigation} from "@react-navigation/native";
import {onChangeRoomRequest} from "../../../module/room";
import {useDispatch, useSelector} from "react-redux";
import SelectGroup from "../../../components/room/form/SelectGroup";
import Calendar from "../../../components/room/form/Calendar";
import ErrorMessage from "../../../components/common/ErrorMessage";

function BaseInfoFormScreen() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {request} = useSelector(({room}) => ({
        request: room.roomRequest,
    }));

    /** 달력 모달 **/
    const [show, setShow] = useState(false);

    /**
     * 입력 예외처리 state
     * 스터디룸 이름
     * 시작일
     */
    const [requiredError, setRequiredError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);

    /** 예외처리 메시지 **/
    const errorMessage = useMemo(() => "필수 요소입니다.", []);
    const startDateErrorMessage = useMemo(() => "올바르지 않은 시작 날짜입니다..", []);

    /** 최대 인원 리스트 **/
    const maxUserNumItems = useMemo(() => {

        const MAX_USER_NUM = 6;
        let items = [];
        for (let i = 2; i <= MAX_USER_NUM; i++) {
            items.push({label: i + '명', value: i, key: i - 1});
        }
        return items;
    }, []);
    /** 참가비 리스트 **/
    const entryFeeItems = useMemo(() => {

        const ENTRY_FEE_NUM = 20;
        let items = [];
        for (let i = 1; i <= ENTRY_FEE_NUM; i++) {
            items.push({label: i * 5000 + '원', value: i * 5000, key: i});
        }
        return items;
    }, []);
    /** 주차 리스트 **/
    const weekItems = useMemo(() => {

        const MAX_WEEK_COUNT = 48;
        let items = [];
        for (let i = 1; i <= MAX_WEEK_COUNT; i++) {
            items.push({label: i  + '주', value: i , key: i});
        }
        return items;
    }, []);
    /** input, selector 입력 **/
    const onChange = (targetName, value) => {
        const next = {
            ...request,
            [targetName]: value,
        };
        dispatch(onChangeRoomRequest(next));
    };
    /** 날짜 선택 **/
    const onConfirm = (date) => {
        const target = new Date(date);
        const next = {
            ...request,
            "start_date": `${target.getFullYear()}-${("00" + (target.getMonth() + 1)).slice(-2)}-${("00" + (target.getDate())).slice(-2)}`,
        };
        dispatch(onChangeRoomRequest(next));
        setShow(false);

        if (setStartDateError) {
            setStartDateError(() => false);
        }
    }
    /** 날짜 선택 모달 닫기 **/
    const onCancel = () => {
        setShow(false);
    }
    /** 다음 버튼 **/
    const onPressNext = () => {
        const {title, start_date} = request;

        if (title === "") {
            setRequiredError(true);
        }

        if (start_date == null) {
            setStartDateError(true);
        }

        if (title !== "" && start_date != null) {
            setRequiredError(() => false);
            navigation.navigate('create-room-rules-and-account');
        }
    }

    return (
        <CreateRoomTemplate>
            <View style={styles.content_container}>
                <View style={styles.input_group}>
                    <Text style={styles.input_title}>스터디룸 이름</Text>
                    <Shadow style={{width: "100%"}} {...styles.shadow}>
                        <TextInput style={[styles.input]}
                                   value={request.title}
                                   onBlur={() => request.title === "" ? setRequiredError(true) : setRequiredError(false)}
                                   onChangeText={(text) => onChange("title", text)}/>
                    </Shadow>
                </View>
                {requiredError && <ErrorMessage message={errorMessage}/>}
                <View style={styles.input_group}>
                    <Text style={styles.input_title}>인원</Text>
                    <Shadow style={{width: "100%"}} {...styles.shadow}>
                        <SelectGroup
                            selected={request.max_user_num}
                            targetName="max_user_num"
                            items={maxUserNumItems}
                            onChange={onChange}/>
                    </Shadow>
                </View>
                <View style={styles.input_group}>
                    <Text style={styles.input_title}>시작일</Text>
                    <View style={styles.calender_group}>
                        <Shadow {...styles.shadow}>
                            <View style={styles.date}>
                                <Text>{request.start_date}</Text>
                            </View>
                        </Shadow>
                        <AntDesign name="calendar" size={36} color="black" onPress={() => setShow(true)}/>
                    </View>
                </View>
                <View style={styles.input_group}>
                    <Text style={styles.input_title}>주차 선택</Text>
                    <Shadow style={{width: "100%"}} {...styles.shadow}>
                        <SelectGroup
                            selected={request.week}
                            targetName="week"
                            items={weekItems}
                            onChange={onChange}/>
                    </Shadow>
                </View>
                {startDateError && <ErrorMessage message={errorMessage}/>}
                <View style={styles.input_group}>
                    <Text style={styles.input_title}>참가비</Text>
                    <Shadow style={{width: "100%"}} {...styles.shadow}>
                        <SelectGroup
                            selected={request.entry_fee}
                            targetName="entry_fee"
                            items={entryFeeItems}
                            onChange={onChange}/>
                    </Shadow>
                </View>
                <TouchableOpacity style={styles.button}
                                  onPress={() => onPressNext()}>
                    <Text style={styles.button_text}>다음</Text>
                </TouchableOpacity>
            </View>
            <Calendar show={show} onConfirm={onConfirm} onCancel={onCancel}/>
        </CreateRoomTemplate>
    );
}

const styles = StyleSheet.create(
    {
        shadow: {
            distance: 0,
            offset: [0, 5]
        },
        container: {
            width: "100%",
            height: "100%",
        },
        scroll_container: {

            height: hp(100),
            alignItems: "center",
        },
        content_container: {
            alignSelf: "center",
            justifyContent: "space-between",
            width: "80%",

            marginTop: "10%",
        },
        input_group: {
            width: "100%",
            justifyContent: "space-around",
            height: hp(15),
        },
        calender_group: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

        },
        input_title: {
            fontWeight: "bold",
            fontSize: 18,
        },
        input: {
            width: "100%",
            padding: wp(2),
            height: hp(6),
            backgroundColor: "#ffffff",
        },
        date: {
            justifyContent: "center",
            width: wp(50),
            padding: wp(2),
            height: hp(6),
            backgroundColor: "#ffffff",
        },
        button: {
            height: "10%",
            backgroundColor: "#262A2D",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
        },
        button_text: {
            color: "#ffffff",
            fontSize: 18,
        },
    }
);


export default BaseInfoFormScreen;
