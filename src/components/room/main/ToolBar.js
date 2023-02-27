import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from "react-native";

function ToolBar({roomInfo, authority, onPress}) {

    const [curWeekLeftDay, setCurWeekLeftDay] = useState(0);
    const [studyWeekLeft, setStudyWeekLeft] = useState(0)

    useEffect(() => {
        const {week, current_week} = roomInfo;
        const thisDate = new Date();
        setCurWeekLeftDay(7 - thisDate.getDay());
        setStudyWeekLeft(week - current_week);
    }, [roomInfo]);


    return (
        <>
            <ToolList authority={authority} onPress={onPress}/>
            <DateInfo weekDayLeft={curWeekLeftDay} studyWeekLeft={studyWeekLeft}/>
        </>

    );
}

const ToolList = ({authority, onPress}) => {
    return (
        <View style={styles.toolList_container}>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text
                style={styles.main_text}>랭킹</Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text
                style={styles.main_text}>룰</Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                {
                    authority &&
                    (
                        <Text style={styles.main_text} onPress={onPress}>
                            참가 승인
                        </Text>
                    )
                }
            </View>
            <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}><Text
                style={styles.main_text}>환급 비용 계산</Text>
            </View>
        </View>
    );
};

const DateInfo = ({weekDayLeft, studyWeekLeft}) => {
    return (
        <>
            <View style={{flex: 1, flexDirection: 'row',}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20}}>이번주 D - {weekDayLeft}일</Text>
                </View>
                <View style={{flex: 0.01, backgroundColor: 'white'}}/>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20}}>스터디 D - {studyWeekLeft}주</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create(
    {
        toolList_container: {
            flex: 1.5,
            backgroundColor: '#EDEDED',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flexDirection: 'row'
        },
        main_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 20,
        },
    }
);
export default ToolBar;
