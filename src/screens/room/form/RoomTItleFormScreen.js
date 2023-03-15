import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onChangeRoomRequest} from "../../../module/room";
import Toast from "react-native-root-toast";
import {StyleSheet, Text, View} from "react-native";
import Logo from "../../../components/common/Logo";
import InputGroup from "../../../components/room/form/InputGroup";
import SelectGroup from "../../../components/room/form/SelectGroup";
import NextOrCloseButton from "../../../components/room/form/NextOrCloseButton";

function RoomTitleFormScreen({navigation}) {
    const SCREEN_TITLE = "새로운 스터디방 만들기";
    const INPUT_TITLE = "스터디방 이름";
    const SELECT_TITLE = "스터디방 인원";

    const dispatch = useDispatch();
    const {request} = useSelector(({room}) => ({
        request: room.roomRequest,
    }));

    const getSelectItems = useCallback(() => {

        const MAX_USER_NUM = 6;
        let items = [];
        for (let i = 2; i <= MAX_USER_NUM; i++) {
            items.push({label: i + '명', value: i, key: i - 1});
        }
        return items;
    }, []);


    const onChange = (targetName, value) => {
        const next = {
            ...request,
            [targetName]: value,
        };
        dispatch(onChangeRoomRequest(next));
    };

    const onPress = useCallback(() => {
        const {title, max_user_num} = request;

        if (title === "" || max_user_num === null) {
            Toast.show('모든 정보를 입력하세요', {duration: Toast.durations.LONG});
        } else {
            navigation.navigate('room-create-schedule-form');
        }
    }, [request]);

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                <InputGroup title={INPUT_TITLE} targetName={"title"} onChange={onChange}/>
                <InputGroup title={SELECT_TITLE}>
                    <SelectGroup selected={request.max_user_num} targetName={"max_user_num"} items={getSelectItems()} onChange={onChange}/>
                </InputGroup>
                <View style={styles.button_container}>
                    <NextOrCloseButton onPress={onPress}/>
                </View>

            </View>
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

        button_container: {
            marginTop: "10%",
            width: "30%",
            height: "10%",
        },
        screen_title: {
            alignItems: 'flex-start',
            fontSize: 22,
            width: '90%',
            fontWeight: 'bold',
        },
    }
);
export default RoomTitleFormScreen;
