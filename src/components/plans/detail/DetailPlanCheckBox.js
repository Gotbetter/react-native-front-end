import React from 'react';
import CheckIcon from "react-native-vector-icons/Fontisto";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {StyleSheet, TouchableOpacity} from "react-native";

function DetailPlanCheckBox({detailPlanId, comment, checked, onPress}) {
    return (
        <TouchableOpacity style={styles.container}>
            {
                checked === false ? <CheckIcon name="checkbox-passive"
                                               onPress={() => onPress(detailPlanId, comment, checked)}
                                               size={wp(5)}/>
                    : <CheckIcon name="checkbox-active"
                                 onPress={() => onPress(detailPlanId, "", checked)}
                                 size={wp(5)}/>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "10%",
        },
    }
);


export default DetailPlanCheckBox;
