import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";

function SelectGroup({selected, targetName, items, onChange}) {

    return (
        <View style={styles.picker_container}>
            <Picker
                selectedValue={selected}
                onValueChange={(value) => onChange(targetName, value)}>
                {
                    items.map(item => (
                        <Picker.Item key={item.key} label={item.label} value={item.value} />
                    ))
                }
            </Picker>
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
