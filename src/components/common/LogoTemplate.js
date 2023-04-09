import React from 'react';
import {StyleSheet, View} from "react-native";

function LogoTemplate({children}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            alignItems: "center",
            marginTop: "6%",
        },
    }
);
export default LogoTemplate;
