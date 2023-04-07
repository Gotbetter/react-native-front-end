import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {MIDDLE_BACKGROUND} from "../../../const/color";
import UserIcon from "../../common/UserIcon";
import {heightPercentageToDP} from "react-native-responsive-screen";

function ParticipantsGroup({participants}) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.content_title_text}>참가자</Text>
            </View>
            <View style={styles.participants_container}>
                {/* profile + name container*/}
                <View style={{marginBottom: "10%"}}>
                    <UserIcon name="구름용" img={null} color="#ffffff"/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
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

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },

        content_title_text: {
            fontSize: 18,
        },
    }
);
export default ParticipantsGroup;
