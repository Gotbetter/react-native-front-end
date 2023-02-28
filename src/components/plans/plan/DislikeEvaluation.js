import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


function DislikeEvaluation({onPress, planDislikeInfo}) {
    const {checked, dislike_count} = planDislikeInfo
    return (
        <View style={[styles.dislike_button, checked === true ? styles.checked : null]}>
            <TouchableOpacity onPress={onPress}>
                <Icon name="thumbs-down" color="white" size={hp(6)}/>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create(
    {
        dislike_button: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: wp(5),
            marginRight: wp(5),
            borderRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
            backgroundColor: '#000000',
        },
        checked: {
            backgroundColor: 'red',
        },
    }
)

export default DislikeEvaluation;
