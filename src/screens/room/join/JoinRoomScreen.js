import {
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

import React, {useState} from 'react';

import client from "../../../lib/client";

import Toast from "react-native-root-toast";
import Logo from "../../../components/common/Logo";
import PreventRollUpView from "../../../components/common/PreventRollUpView";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import LogoTemplate from "../../../components/common/LogoTemplate";

export default function JoinRoomScreen({navigation}) {


    const [request, setRequest] = useState('');

    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState("");
    const [entryFee, setEntryFee] = useState(0);


    const onChangeText = (text) => {
        setRequest(text);
    };

    const onClickParticipate = () => {

        /** 400 오류는 if문을 통해 해결**/
        if (request === '') {
            Toast.show("참여코드를 입력해 주세요", {duration: Toast.durations.SHORT});
        } else {
            client.post(
                `/participants`,
                {room_code: request}
            ).then(({data: {account, entry_fee}}) => {
                setAccount(account);
                setEntryFee(entry_fee);
                setOpen(true);
            }).catch(({message, response: {status}}) => {
                if (status === 404) {
                    Toast.show("참여코드를 확인해 주세요.", {duration: Toast.durations.SHORT});
                    /** 잘못된 코드 **/
                } else if (status === 406) {
                    /** 인원 초과 **/
                    Toast.show("참여하는 방의 인원이 초과되었습니다.", {duration: Toast.durations.SHORT});
                } else if (status === 409) {
                    /** 이미 참여 했거나 승인 요청을 보낸 경우 **/
                    Toast.show("이미 요청한 코드입니다.", {duration: Toast.durations.SHORT});
                }
            });
        }
        setRequest('');
    }


    return (
        <PreventRollUpView>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={open}
                        onRequestClose={() => {
                            setOpen(!open);
                        }}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{
                                backgroundColor: '#EDEDED',
                                width: '90%',
                                height: '30%',
                                borderRadius: 30,
                                borderWidth: 5,
                                borderColor: '#DBDBDB'
                            }}>
                                <View style={{
                                    flex: 4,
                                    backgroundColor: 'white',
                                    borderTopLeftRadius: 30,
                                    borderTopRightRadius: 30,
                                    justifyContent: 'center',
                                }}>
                                    <Text style={styles.modal_text}>
                                        방장에게 승인 요청을 신청하였습니다. {account}로 {entryFee}원을 송금해주세요.
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => setOpen(false)}
                                                  style={{flex: 1, alignItems: 'center'}}>
                                    <Text style={styles.modal_text}>
                                        닫기
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>


                    <View style={{flex: 4}}>
                        <View style={{flex: 1}}/>

                        <LogoTemplate>
                            <Logo size={wp(70)}/>
                        </LogoTemplate>

                        <View style={{flex: 1}}/>
                    </View>
                    <View style={{flex: 3, alignItems: 'center', justifyContent: 'center',}}>
                        <View style={{flex: 1}}/>
                        <TextInput
                            placeholder='참여코드'
                            value={request}
                            onChangeText={(text) => onChangeText(text)}
                            style={styles.text_input}
                        />
                        <View style={{flex: 2}}/>
                        <TouchableOpacity style={styles.join_button} onPress={() => onClickParticipate()}>
                            <Text style={styles.join_button_text}>참여하기</Text>
                        </TouchableOpacity>
                        <View style={{flex: 2}}/>
                    </View>

                    <View style={{flex: 3}}/>

                </View>
            </TouchableWithoutFeedback>
        </PreventRollUpView>

    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: 'white',
    },
    logo_image: {
        flex: 1,
        alignSelf: 'center',
        width: '80%',
    },
    text_input: {
        flex: 2,
        width: '90%',
        backgroundColor: '#EDEDED',
        borderRadius: 20,
        paddingLeft: 20,
        fontSize: 15,
    },
    join_button: {
        flex: 3,
        width: '70%',
        backgroundColor: '#000000',
        borderRadius: 20,
        justifyContent: 'center',
    },
    join_button_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 30,
    },
    modal_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 30,
    },
});
