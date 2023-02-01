import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {AntDesign} from "@expo/vector-icons";

function SelectGroup({selected, targetName, items, onChange}) {

    return (
        <View style={styles.picker_container}>
            <Text style={styles.text}>{selected}</Text>
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => onChange(targetName, value)}
                placeholder={{}}
                style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    iconContainer: {
                        top: 18,
                        right: 18,
                    },
                }}
                items={items}
                Icon={() => <AntDesign name="down" size={24} color="white"/>}
            />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        picker_container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',
            width: "60%",
            height: "100%",
        },
        picker: {
            width: 65,
            height: 60,
            backgroundColor: 'black',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',
        },
        text: {
            width: 135,
            height: 60,
            padding: 20,
        },
    }
);

export default SelectGroup;
