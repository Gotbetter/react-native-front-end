import React from 'react';
import {StyleSheet} from "react-native";
import {Picker} from "@react-native-picker/picker";

function SelectGroup({selected, targetName, items, onChange}) {

    return (
        <Picker
            style={styles.picker_container}
            selectedValue={selected}
            onValueChange={(value) => onChange(targetName, value)}>
            {
                items.map(item => (
                    <Picker.Item key={item.key} label={item.label} value={item.value}/>
                ))
            }
        </Picker>

    )
}

const styles = StyleSheet.create(
    {
        picker_container: {
            width: "100%",
            backgroundColor: "#ffffff",
        },
    }
);

export default SelectGroup;
