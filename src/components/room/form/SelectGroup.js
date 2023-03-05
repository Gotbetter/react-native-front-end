import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {AntDesign} from "@expo/vector-icons";

function SelectGroup({selected, targetName, items, onChange}) {

    return (
        <View style={styles.picker_container}>
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => onChange(targetName, value)}
                placeholder={{}}
                style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                }}
                items={items}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        picker_container: {
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',
            width: "60%",
            height: "100%",
            justifyContent: "center",
        },
        picker: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            color: 'black',
            paddingRight: 30,
        },

    }
);

export default SelectGroup;
