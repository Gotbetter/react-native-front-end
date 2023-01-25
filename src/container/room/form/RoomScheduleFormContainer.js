import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Logo from "../../../components/common/Logo";
import InputGroup from "../../../components/room/form/InputGroup";
import SelectGroup from "../../../components/room/form/SelectGroup";
import ContinueButton from "../../../components/room/form/ContinueButton";

function RoomScheduleFormContainer({navigation}) {

    const SCREEN_TITLE = "스터디방 일정을 설정하세요";
    const INPUT_TITLE = "스터디방 일정";

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                <InputGroup title={INPUT_TITLE}>
                    <SelectGroup/>
                </InputGroup>
                <ContinueButton onPress={() => navigation.navigate('room-create-entry-fee-form')}/>
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

export default RoomScheduleFormContainer;
