import React, {useEffect} from 'react';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {Button, Text, View} from "react-native";
import {Platform} from 'react-native';
import {useIsFocused} from "@react-navigation/native";


function Calendar({onChangeDateAndroid, onChangeDateIOS, date, onConfirm, onCancel,onChange}) {

    if (Platform.OS === 'ios') {
        return (
            <View>
                <Button title={'confirm'} onPress={onConfirm}/>
                <Button title={'cancel'} onPress={onCancel}/>
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    display={"spinner"}
                    onChange={onChangeDateIOS}
                >
                </RNDateTimePicker>
            </View>
        );
    } else if(Platform.OS === 'android'){
        return (
            <View>
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    display={"default"}
                    onChange={onChangeDateAndroid}
                >
                </RNDateTimePicker>
            </View>
        )
    }

}

export default Calendar;
