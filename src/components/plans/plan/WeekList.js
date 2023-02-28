import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function WeekList({plannerName, weekList, clickedWeek, setClickedWeek}) {
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5}}/>
            <View style={styles.user_container}>
                <Text style={styles.user_name_text}>{plannerName}</Text>
            </View>
            <View style={styles.week_container}>
                <ScrollView horizontal={true} style={{flex: 1}}>
                    {
                        weekList && (
                            weekList.map((week) => (
                                <TouchableOpacity key={week}
                                                  style={clickedWeek === week ? styles.current_week : styles.non_current_week}
                                                  onPress={() => setClickedWeek(week)}>
                                    <Text style={clickedWeek === week ? styles.current_week_text : styles.week_text}>
                                        {week}주차
                                    </Text>
                                </TouchableOpacity>
                            )))
                    }
                </ScrollView>
            </View>
            <View style={{flex: 0.5}}/>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        user_container: {
            flex: 2,
            backgroundColor: '#DFDFDF',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        user_name_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 20,
        },
        week_container: {
            flex: 7,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderWidth: 5,
            borderColor: '#BFBFBF',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },

        non_current_week: {
            width: hp(8),
            height: hp(8),
            marginLeft: wp(1),
            borderRadius: 30,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 5,
            borderColor: '#BFBFBF',
        },
        current_week_text: {
            color: '#FFFFFF',
            textAlign: 'center',
            fontSize: 15,
        },
        current_week: {
            width: hp(8),
            height: hp(8),
            marginLeft: wp(1),
            borderRadius: 30,
            backgroundColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 5,
            borderColor: '#BFBFBF',
        },
        week_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 15,
        },
    }
)

export default WeekList;
