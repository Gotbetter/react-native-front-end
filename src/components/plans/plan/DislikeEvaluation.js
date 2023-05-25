import {StyleSheet, TouchableOpacity, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";


function DislikeEvaluation({isMyPlan, onPress, checked, size, style}) {

    return (
        <View style={[styles.dislike_button, style]}>
            <TouchableOpacity onPress={onPress} disabled={isMyPlan}>
                <Entypo name="thumbs-down" size={size} color={checked === true ? "red" : "black"}/>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create(
    {
        dislike_button: {

            justifyContent: "center",
            alignItems: "center",
            width: "10%",
        },
        checked: {
            backgroundColor: 'red',
        },
    }
)

export default DislikeEvaluation;
