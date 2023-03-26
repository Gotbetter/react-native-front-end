import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function RoomSubInfo({title, account, totalEntryFee, entryFee, roomCode}) {
    return (
        <View style={styles.info}>
            <Text style={styles.title}>방 정보</Text>
            <Text style={styles.text}>스터디방 이름: {title}</Text>
            <Text style={styles.text}>상납 계좌: {account}</Text>
            <Text style={styles.text}>전체 모인 금액: {totalEntryFee}원</Text>
            <Text style={styles.text}>입장료: {entryFee}원</Text>
            <Text style={styles.text}>방 코드: {roomCode}</Text>
        </View>
    );
}
const styles = StyleSheet.create(
    {
        info: {
            borderWidth: 1,
            borderRadius: 16,
            padding: 12,
            width: "100%",
            height: "100%"
        },
        title: {
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: "4%",
        },
        text: {
            marginBottom: "3%",
        }
    }
);
export default RoomSubInfo;
