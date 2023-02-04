import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import Logo from "../../../components/common/Logo";
import ContinueButton from "../../../components/room/form/ContinueButton";
import Calendar from "../../../components/room/form/Calendar";
import {AntDesign} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {onChangeRequest} from "../../../module/room";
import Toast from "react-native-root-toast";

function RoomScheduleFormContainer({navigation}) {

    const SCREEN_TITLE = "스터디방 일정을 설정하세요";
    const INPUT_TITLE = "스터디방 일정";
    const TODAY = new Date();

    const dispatch = useDispatch();


    const {request} = useSelector(({room}) => ({
        request: room.request,
    }));

    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(TODAY);
    const [dateColumn, setDateColumn] = useState('start_date');
    const [date, setDate] = useState(new Date());

    const onConfirm = () => {

        const next = {
            ...request,
            [dateColumn]: selectedDate,
        };
        dispatch(onChangeRequest(next));
        setShow(false);

        if ('start_date' === dateColumn) {
            setDateColumn('target_date');
        } else {
            setDateColumn('start_date');
        }

    };

    const onChange = (e, selectedDate) => {
        setSelectedDate(selectedDate);
    }

    const onPress = (column) => {
        setDateColumn(column);
        setShow(true);
    };

    const onPressNext = () => {
        const {start_date, target_date} = request;

        const cmpStartDate = start_date.toLocaleDateString();
        const cmpTODAY = TODAY.toLocaleDateString();

        if (start_date === null || target_date === null) {
            Toast.show('스터디방 일정을 설정해주세요', {duration: Toast.durations.LONG});
        } else if ((start_date >= target_date) || (new Date(cmpStartDate) < new Date(cmpTODAY))) {
            Toast.show('정상적인 범위를 선택해주세요', {duration: Toast.durations.LONG});
        } else {
            navigation.navigate('room-create-entry-fee-form');
        }

    }

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>

                <View style={styles.calendar_group_container}>
                    <Text style={styles.text}>{INPUT_TITLE}</Text>
                    <View style={styles.calendar_container}>
                        <Text style={styles.date_viewer}>
                            <Text onPress={() => onPress("start_date")}>
                                {request.start_date && request.start_date.toLocaleDateString()}
                            </Text>
                            ~
                            <Text onPress={() => onPress("target_date")}>
                                {request.target_date && request.target_date.toLocaleDateString()}
                            </Text>

                        </Text>
                        <AntDesign name="calendar" size={36} color="black" onPress={() => setShow(true)}/>
                    </View>
                </View>
                <ContinueButton onPress={onPressNext}/>
            </View>
            {show && <Calendar show={show}
                               onChange={onChange}
                               onCancel={() => setShow(false)}
                               date={date}
                               onConfirm={onConfirm}
            />}

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
        text: {
            fontSize: 18,
        },

        calendar_group_container: {
            marginTop: 30,
            justifyContent: 'space-between',
            alignItems: "center",
            flexDirection: 'row',
            width: '90%',
        },

        calendar_container: {
            flexDirection: "row",
            width: "60%",
            justifyContent: 'space-between',
            alignItems: "center",

        },

        date_viewer: {
            textAlign: "center",
            lineHeight: 60,
            width: "80%",
            height: 60,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',
        },

        screen_title: {
            alignItems: 'flex-start',
            fontSize: 22,
            width: '90%',
            fontWeight: 'bold',
        },
    }
);

export default RoomScheduleFormContainer;
