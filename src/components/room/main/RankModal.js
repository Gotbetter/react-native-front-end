import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, View} from "react-native";
import NextOrCloseButton from "../form/NextOrCloseButton";
import {useDispatch, useSelector} from "react-redux";
import {fetchRank} from "../../../module/room";

function RankModal({room_id, show, setShow}) {

    const rankList = useSelector(({room}) => (room.rank));
    const dispatch = useDispatch();
    useEffect(() => {
        if (show) {
            dispatch(fetchRank(room_id));
        }
    }, [show]);


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
        >
            <View style={styles.container} >
                <View style={styles.rank_container}>
                {
                    rankList.map(rank => (
                       <View style={styles.content_container} key={rank.rank}>
                            <Text style={styles.text}>{rank.rank}등</Text>
                            <Text style={styles.text}>{rank.username}</Text>
                            <Text style={styles.text}>환급금 {rank.refund}원</Text>
                       </View>
                    ))
                }
                </View>
                <View style={styles.button_container}>
                    <NextOrCloseButton name='나가기' onPress={() => setShow(!show)}/>
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
            justifyContent: "center",
            alignItems: "center",

        },
        rank_container: {
            padding: 10,
            borderWidth: 1,
            width: "80%",
            height: "30%",
            backgroundColor: "white",
            marginBottom: "10%",
        },
        content_container: {
            marginBottom: "5%",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        text: {
            fontSize: "20%",
        },
        button_container: {
            width: "40%",
            height: "8%",
        }
    }
);
export default RankModal;
