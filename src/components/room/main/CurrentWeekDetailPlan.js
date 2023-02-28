import React from 'react';
import {StyleSheet, Text, View} from "react-native";


function CurrentWeekDetailPlan({detailPlans}) {

    return (
        <>
            <View style={styles.title_container}>
                <Text style={styles.title_text}>나의 이번주 계획</Text>
            </View>
            <View style={styles.detailPlan_container}>
                {
                    detailPlans.map((detailPlan) => (
                        <View key={detailPlan.detail_plan_id} style={styles.detailPlan}>
                            <Text style={styles.detailPlan_text}>{detailPlan.content}</Text>
                        </View>
                    ))
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create(
    {
        title_container: {
            flex: 1.5,
            backgroundColor: '#BFBFBF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title_text: {
            fontSize: 15
        },
        detailPlan_container: {
            flex: 8.5,
            backgroundColor: '#EDEDED',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        detailPlan: {
            flex: 1,
            justifyContent: 'center',
            marginLeft: '10%',
            marginRight: '10%',
        },
        detailPlan_text: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 17.5,
        }


    }
);
export default CurrentWeekDetailPlan;
