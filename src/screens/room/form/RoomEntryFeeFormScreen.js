import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onChangeRoomRequest} from "../../../module/room";
import Toast from "react-native-root-toast";
import {StyleSheet, Text, View} from "react-native";
import Logo from "../../../components/common/Logo";
import InputGroup from "../../../components/room/form/InputGroup";
import SelectGroup from "../../../components/room/form/SelectGroup";
import NextOrCloseButton from "../../../components/room/form/NextOrCloseButton";

function RoomEntryFeeFormScreen({navigation}) {
    const SCREEN_TITLE = "스터디방 참가비를 설정하세요";
    const INPUT_TITLE = "스터디방 참가비";

    const dispatch = useDispatch();
    const {request} = useSelector(({room}) => ({
        request: room.roomRequest,
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
        dispatch(onChangeRoomRequest(next));
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

export default RoomEntryFeeFormScreen;
