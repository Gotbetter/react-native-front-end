import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MIDDLE_BACKGROUND} from "../../../const/color";
import UserIcon from "../../common/UserIcon";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {useNavigation} from "@react-navigation/native";

function ParticipantsGroup({participants, onPress}) {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.content_title_text}>참가자</Text>
            </View>
            <View style={[styles.participants_container, styles.shadow]}>
                {/* profile + name container*/}
                {
                    participants.map(participant => (
                        <TouchableOpacity key={participant.participant_id}
                                          onPress={() => onPress(participant.participant_id)}>
                            <View style={{marginBottom: "10%"}}>
                                <UserIcon name={participant.username} img={null} color="#ffffff"/>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        container: {
            width: "100%",
            marginTop: "10%",
        },
        participants_container: {
            marginTop: "6%",
            width: "100%",
            padding: 12,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 12,
            borderWidth: 1,
            backgroundColor: MIDDLE_BACKGROUND,
        },

        content_title_text: {
            fontSize: 18,
        },
    }
);
export default ParticipantsGroup;
