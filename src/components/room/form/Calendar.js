import React from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {View} from "react-native";


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
