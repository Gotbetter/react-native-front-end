import React from 'react';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {Button, View} from "react-native";



function Calendar({date, mode, onConfirm, onCancel, onChange}) {

    return (
        <View>
            <Button title={'confirm'} onPress={onConfirm}/>
            <Button title={'cancel'} onPress={onCancel}/>
            <RNDateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
            />

        </View>


    );
}

export default Calendar;
