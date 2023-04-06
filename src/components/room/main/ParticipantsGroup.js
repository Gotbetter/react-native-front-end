import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {MIDDLE_BACKGROUND} from "../../../const/color";
import UserIcon from "../../common/UserIcon";

function ParticipantsGroup({participants}) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.content_title_text}>참가자</Text>
            </View>
            <View style={styles.participants_container}>
                {/* profile + name container*/}
                <UserIcon name="구름용" img={null}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:{
            width: "100%",
            marginTop: "10%",
        },

        participants_container: {
            marginTop: "6%",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 12,
            backgroundColor: MIDDLE_BACKGROUND,
        },

        content_title_text: {
            fontSize: 18,
        },
    }

);
export default ParticipantsGroup;
