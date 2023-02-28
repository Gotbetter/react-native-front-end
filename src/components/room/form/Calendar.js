import React from 'react';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {Button, Platform, View} from "react-native";


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
