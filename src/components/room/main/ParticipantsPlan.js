import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

function ParticipantsPlan({participants, onPressPlans}) {
    return (
        <>
            <View style={styles.title_container}>
                <Text style={{fontSize: 15}}>친구들과 나의 계획</Text>
            </View>
            <View style={styles.plans_container}>
                <View style={{flex: 0.1}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        participants.map((participant, i) => (
                                <View key={participant.participant_id} style={{flex: 1, alignItems: 'center'}}>
                                    <View style={{flex: 1}}/>
                                    <TouchableOpacity style={styles.user} onPress={() => onPressPlans(participant)}>
                                        <Text style={styles.button_text}>{participant.username}</Text>
                                    </TouchableOpacity>
                                    <View style={{flex: 1}}/>
                                </View>
                            )
                        )}
                </View>
                <View style={{flex: 0.1}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/*{participant_list_middle}*/}
                </View>
                <View style={{flex: 0.1}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/*{participant_list_bottom}*/}
                </View>
                <View style={{flex: 0.1}}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create(
    {
        title_container: {
            flex: 1.5,
            backgroundColor: '#BFBFBF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        plans_container: {
            flex: 8.5,
            backgroundColor: '#EDEDED',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        button_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 20,
        },
        user: {
            flex: 8,
            backgroundColor: '#FFFFFF',
            width: '90%',
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
            justifyContent: 'center',
        },
    }
)

export default ParticipantsPlan;
