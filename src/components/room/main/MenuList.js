import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function MenuList({authority, onPress}){
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
