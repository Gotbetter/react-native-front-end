import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

function InputGroup({title, children, targetName, onChange}) {

    return (
        <View style={styles.input_group_container}>
            <Text style={styles.input_title}>{title}</Text>
            {children || <TextInput style={styles.input} onChange={e => onChange(targetName, e.nativeEvent.text)}/>}
        </View>
    );
}

const styles = StyleSheet.create(
    {
        input_group_container: {
            marginTop: 30,
            justifyContent: 'space-between',
            alignItems: "center",
            flexDirection: 'row',
            width: '90%',
        },
        input_title: {
            fontSize: 18,
        },
        input: {
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',
            width: "60%",
            height: "100%",
            padding: 20,
        },
    }
);

export default InputGroup;
