import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Logo from "../../../components/common/Logo";
import InputGroup from "../../../components/room/form/InputGroup";
import SelectGroup from "../../../components/room/form/SelectGroup";
import ContinueButton from "../../../components/room/form/ContinueButton";

function RoomRulesFormContainer({navigation}) {
    const SCREEN_TITLE = "룰을 선택하세요";

    const rules = [
        {
            id: 1,
            content: "1등 200%, 2~5등 100%, 6등 0% 환급"
        },
        {
            id: 2,
            content: "1등 180%, 2~5등 90%, 6등 60% 환급"
        },
    ];

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                {rules.map(rule => (
                    <TouchableOpacity key={rule.id} style={styles.rule_container}>
                        <Text style={styles.rule_text}>{rule.content}</Text>
                    </TouchableOpacity>
                ))}
                <ContinueButton name="방 만들기" onPress={() => {
                }}/>
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

        rule_text:{
            fontSize: 18,
        }


    }
);

export default RoomRulesFormContainer;
