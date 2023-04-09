import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


export function DislikeEvaluationCount({dislikeCount, participantCount}) {
    return (

        <View style={styles.dislike_container}>
            <Text style={styles.dislike_text}>{dislikeCount} / {participantCount}</Text>
        </View>

    );
};

const styles = StyleSheet.create(
    {
        dislike_container: {
            borderWidth: 1,
            width: "10%",
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: "row",
        },
        dislike_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 12,
        },

    }
)
