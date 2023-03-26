import React from 'react';
import RNDateTimePicker, {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Button, Platform, View} from "react-native";


function Calendar({show, onConfirm, onCancel}) {

    return (
        <View>
            <DateTimePickerModal
                mode="date"
                onConfirm={onConfirm}
                onCancel={onCancel}
                isVisible={show}/>
        </View>
    )
}

export default Calendar;
