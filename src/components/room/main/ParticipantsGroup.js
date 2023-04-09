import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MIDDLE_BACKGROUND} from "../../../const/color";
import UserIcon from "../../common/UserIcon";

function ParticipantsGroup({participants, myParticipantId,onPress}) {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.content_title_text}>참가자</Text>
            </View>
            <View style={[styles.participants_container, styles.shadow]}>
                {
                    participants.map(participant => (
                        <TouchableOpacity key={participant.participant_id}
                                          onPress={() => onPress(participant.user_id, participant.participant_id, participant.username)}>
                            <View style={{marginBottom: "10%"}}>
                                <UserIcon name={participant.username} img={null} color={participant.participant_id === myParticipantId ? "#ffffff" : "#262A2D"}/>
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
