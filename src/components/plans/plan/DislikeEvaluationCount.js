import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


export function DislikeEvaluationCount({dislikeCount, participantCount}) {
    return (

        <View style={styles.dislike_container}>
            <Icon name="thumbs-down" style={styles.thumb} size={hp(4)}/>
            <Text style={styles.dislike_text}>{dislikeCount} / {participantCount}</Text>
        </View>

    );
};

const styles = StyleSheet.create(
    {
        dislike_container: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: "row",
        },
        thumb: {
            marginRight: "4%",
        },
        dislike_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 12,
        },

    }
)
