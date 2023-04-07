import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from "react-native";
import NextOrCloseButton from "../form/NextOrCloseButton";
import {useDispatch, useSelector} from "react-redux";
import {fetchRank} from "../../../module/room";
import ModalHeader from "./ModalHeader";
import UserIcon from "../../common/UserIcon";

function RankModal({show, rank, onPressClose}) {

    const [oneToThird, setOneToThird] = useState([]);
    const [fourToEnd, setFourToEnd] = useState([]);

    const rankColor = ["#FF0000", "#3333FF", "#708090"];
    const refundColor = ["#FF6666", "#6666CC", "#708090"];

    useEffect(() => {
        if (rank.length > 3) {
            setOneToThird(rank.slice(0, 3));
            setFourToEnd(rank.slice(3));
        } else {
            setOneToThird(rank.slice());
        }
    }, [rank]);

    return (
        <Modal animationType="slide" visible={show} onRequestClose={onPressClose}>
            <View style={styles.container}>
                <ModalHeader title="랭킹" onPress={onPressClose}/>
                <View style={styles.rank_container}>
                    {
                        oneToThird.length !== 0 ?
                            (
                                <View style={styles.one_to_third_container}>
                                    {
                                        oneToThird.map((rank, index) => (
                                            <View style={styles.rank_group}>
                                                <Text style={{color: rankColor[index]}}>{rank.rank}등!</Text>
                                                <UserIcon name={rank.name} color="#000000"/>
                                                <Text style={{color: refundColor[index]}}>{rank.refund}원</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            ) : null
                    }
                    {
                        fourToEnd.length !== 0 ?
                            (
                                <View style={styles.four_to_end_container}>
                                    {
                                        fourToEnd.map(rank => (
                                            <View style={styles.rank_group}>
                                                <Text>{rank.rank}등</Text>
                                                <UserIcon name={rank.name} color="#000000"/>
                                                <Text>{rank.refund}원</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            ) : null
                    }
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: "#EDEDED",
            alignItems: "center",


        },
        rank_container: {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "90%",
        },
        one_to_third_container: {
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "#B4C8BB",
            borderRadius: 12,
            padding: 12,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

        },
        four_to_end_container: {
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "#F3F3F3",
            borderRadius: 12,
            padding: 12,
            marginTop: "10%",

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        blank: {

        },
        rank_group: {
            justifyContent: "center",
            alignItems: "center",
        },


    }
);
export default RankModal;
