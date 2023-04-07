import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Entypo from "react-native-vector-icons/Entypo";


function DislikeEvaluation({}) {

    return (
        <View style={styles.dislike_button}>
            <TouchableOpacity>
                <Entypo name="thumbs-down" size={hp(6)}/>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create(
    {
        dislike_button: {
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
        },
        checked: {
            backgroundColor: 'red',
        },
    }
)

export default DislikeEvaluation;
