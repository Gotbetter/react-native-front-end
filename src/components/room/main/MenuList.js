import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

function MenuList({isRoomLeader, onPress, onPressRank, onPressRoomInfo}) {

    return (
        <View style={styles.toolList_container}>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.main_text} onPress={onPressRank}>랭킹</Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text
                style={styles.main_text}>룰</Text>
            </View>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                {
                    isRoomLeader && isRoomLeader === true ?
                        (
                            <Text style={styles.main_text} onPress={onPress}>
                                참가 승인
                            </Text>
                        ) :
                        (
                            <Text style={styles.main_text} onPress={onPressRoomInfo}>
                                방 정보
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
export default MenuList;
