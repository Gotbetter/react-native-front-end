import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {RFValue} from "react-native-responsive-fontsize";

function LoginSubOption({navigation}) {

    const optionItems = useMemo(() => [
        {
            "id": "register",
            "name": "회원가입",
            "path": "register",
        },
        {
            "id": "find-id",
            "name": "아이디 찾기",
            "path": "",
        },
        {
            "id": "find-password",
            "name": "비밀번호 찾기",
            "path": "",
        },
    ], []);

    return (
        <View style={styles.container}>
            {
                optionItems.map((item, index) => (
                    <View key={item.id}
                          style={[styles.item_container, index !== optionItems.length - 1 ? styles.vertical_line : {}]}>
                        <Text style={styles.text} onPress={() => navigation.navigate(item.path)}>{item.name}</Text>
                    </View>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: wp(70),
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
        },
        text: {
            fontSize: RFValue(10),
            fontWeight: "500",
            color: "#979797",
        },
        item_container: {
            width: wp(24),
            alignItems: "center",
        },
        vertical_line: {
            borderRightWidth: 1,
            borderRightColor: "#979797"
        }
    }
);

export default LoginSubOption;
