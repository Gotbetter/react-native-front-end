import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


export function DislikeEvaluationCount({participantsCount, planDislikeInfo}) {
    const {dislike_count} = planDislikeInfo;
    return (

        <View style={styles.dislike_container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.dislike_text}>친구들의 평가</Text>
            </View>
            <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="thumbs-down" size={hp(6)}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.dislike_text}>{dislike_count} / {participantsCount}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create(
    {
        dislike_container: {
            flex: 1,
            backgroundColor: '#DFDFDF',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: wp(5),
            marginRight: wp(5),

            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
        },
        dislike_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 12,
        },

    }
)
