import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchRefund} from "../../../module/room";
import {Text, View} from "react-native";

function RefundInfo({roomInfo, participantId}) {

    const dispatch = useDispatch();
    const {refund} = useSelector(({room}) => room);

    useEffect(() => {
        dispatch(fetchRefund(participantId));
    }, [roomInfo, participantId]);

    return (
        refund && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 20}}>환급금 {refund.refund}원</Text>
        </View>
    );
}

export default RefundInfo;
