import React from 'react';
import {Text} from "react-native";

function FormattedDate({targetDate}) {

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const date = targetDate.getDate();


    return (
        <Text>{year}년 {month}월 {date}일</Text>
    );
}

export default FormattedDate;
