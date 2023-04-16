import React from 'react';
import {StyleSheet, View} from "react-native";

function LoginTemplate({children}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}


const styles = StyleSheet.create(
    {
        container: {
            alignSelf: "center",
            justifyContent: "center",
            width: "90%",
            height: "50%",
        },
    }
);

export default LoginTemplate;
