import React from 'react';
import {Text} from "react-native";

function FormattedDate({targetDate}) {

    const target = targetDate.split('-');


    return (
        <Text>{target[0]}년 {target[1]}월 {target[2]}일</Text>
    );
}

export default FormattedDate;
