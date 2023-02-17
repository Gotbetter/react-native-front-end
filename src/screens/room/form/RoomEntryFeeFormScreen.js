import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onChangeRequest} from "../../../module/room";
import Toast from "react-native-root-toast";
import {StyleSheet, Text, View} from "react-native";
import Logo from "../../../components/common/Logo";
import InputGroup from "../../../components/room/form/InputGroup";
import SelectGroup from "../../../components/room/form/SelectGroup";
import ContinueButton from "../../../components/room/form/ContinueButton";

function RoomEntryFeeFormScreen({navigation}) {
    const SCREEN_TITLE = "스터디방 참가비를 설정하세요";
    const INPUT_TITLE = "스터디방 참가비";

    const dispatch = useDispatch();
    const {request} = useSelector(({room}) => ({
        request: room.request,
    }));

    const getSelectItems = useCallback(() => {

        const ENTRY_FEE_NUM = 20;
        let items = [];
        for (let i = 1; i <= ENTRY_FEE_NUM; i++) {
            items.push({label: i * 5000 + '원', value: i * 5000, key: i});
        }
        return items;
    }, []);


    const onChange = (targetName, value) => {
        const next = {
            ...request,
            [targetName]: value,
        };
        dispatch(onChangeRequest(next));
    };

    const onPress = useCallback(() => {
        const {entry_fee} = request;

        if (entry_fee === null) {
            Toast.show('입장료를 선택하세요', {duration: Toast.durations.LONG});
        } else {
            navigation.navigate('room-create-rules-form');
        }
    }, [request]);

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                <InputGroup title={INPUT_TITLE}>
                    <SelectGroup selected={request.entry_fee} targetName={"entry_fee"} items={getSelectItems()} onChange={onChange}/>
                </InputGroup>
                <ContinueButton onPress={onPress}/>
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

        screen_title: {
            alignItems: 'flex-start',
            fontSize: 22,
            width: '90%',
            fontWeight: 'bold',
        },
    }
);

export default RoomEntryFeeFormScreen;
