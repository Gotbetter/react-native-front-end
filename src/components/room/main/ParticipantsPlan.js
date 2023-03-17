import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

function ParticipantsPlan({participants, onPressPlans}) {
    return (
        <>
            <View style={styles.title_container}>
                <Text style={{fontSize: 15}}>친구들과 나의 계획</Text>
            </View>
            <View style={styles.plans_container}>
                {
                    participants.map((participant, i) => (

                            <TouchableOpacity style={styles.user} key={participant.participant_id}
                                              onPress={() => onPressPlans(participant)}>
                                <Text style={styles.button_text}>{participant.username}</Text>
                            </TouchableOpacity>

                        )
                    )}
            </View>
        </>
    );
}

const styles = StyleSheet.create(
    {
        title_container: {
            height: "15%",
            backgroundColor: '#BFBFBF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        plans_container: {
            height: "85%",
            backgroundColor: '#EDEDED',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            alignItems: 'center',
        },
        button_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 20,
        },
        user: {
            backgroundColor: '#FFFFFF',
            width: '90%',
            height: hp(5),
            margin: 6,
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
            justifyContent: 'center',
        },
    }
)

export default ParticipantsPlan;
