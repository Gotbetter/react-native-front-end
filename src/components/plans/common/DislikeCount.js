import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function DislikeCount({dislikeCount, participantsCount}) {
    return (
        <View>
            <Text>{dislikeCount}/{participantsCount}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {}
);

export default DislikeCount;
