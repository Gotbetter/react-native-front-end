import React from 'react';
import {StyleSheet, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

function HeaderTemplate({children}) {
    return (
        <View style={styles.container}>
            <View style={styles.blank}/>
            <View style={styles.header_container}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "10%",
        backgroundColor: "#ffffff",
    },
    header_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: hp(9),
    },
    blank: {
        height: hp(2),
    },
});

export default HeaderTemplate;
