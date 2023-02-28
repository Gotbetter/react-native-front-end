import React from 'react';
import {Text, View} from "react-native";

function DateInfo({weekDayLeft, studyWeekLeft}) {

    return (
        <>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 20}}>이번주 D - {weekDayLeft}일</Text>
            </View>
            <View style={{flex: 0.01, backgroundColor: 'white'}}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'white', fontSize: 20}}>스터디 D - {studyWeekLeft}주</Text>
            </View>
        </>
    );
}

export default DateInfo;
