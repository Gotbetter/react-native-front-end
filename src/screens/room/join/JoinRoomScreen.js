import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
    Modal
} from "react-native";

import {useState, useEffect} from 'react';

import { store } from "../../../module/store";

import { useIsFocused } from '@react-navigation/native';

import client from "../../../lib/client";

import Toast from "react-native-root-toast";

export default function JoinRoomScreen ({navigation}) {

    /**
     * useState
     */
    const [code, setCode] = useState("");
    const [token, setToken] = useState("");
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState("");
    const [entryFee, setEntryFee] = useState(0);

    console.log(token)

    const isFocused = useIsFocused(); // 현재 화면을 focuse 하고 있다면 true return

    const joinFunction = (code) => {

        console.log(code, token)

        client.post(
            'rooms/join', {
                "room_code" : code
            }, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
        ).then((response) => {
            // navigation.navigate('main');
            setAccount(response.data.account);
            setEntryFee(response.data.entry_fee);
            setOpen(true);
        }).catch((error) => {
            console.log(error);
            Toast.show('참여코드를 다시 한번 확인해주세요.');
        })
    }

    useEffect(() => {
        const state = store.getState();
        const token = state.auth.user.access_token;
        setToken(token);
    }, [isFocused])

    return (
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
                        <View style={{backgroundColor: '#EDEDED', width: '90%', height: '30%', borderRadius: 30, borderWidth: 5, borderColor: '#DBDBDB'}}>
                            <View style={{flex: 4, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'center', }}>
                                <Text style={styles.modal_text}>
                                    방장에게 승인 요청을 신청하였습니다. {account}로 {entryFee}원을 송금해주세요.
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setOpen(false)} style={{flex: 1, alignItems: 'center'}}>
                                <Text style={styles.modal_text}>
                                    닫기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <View style={{flex: 4}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 2}}>
                        <Image source={require('../../../../assets/images/logo.png')} resizeMode='contain'
                            style={styles.logo_image}/>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
                

                <View style={{flex: 3, alignItems: 'center', justifyContent: 'center',}}>
                    <View style={{flex: 1}}/>
                    <TextInput placeholder='참여코드' onChangeText={text => setCode(text)} style={styles.text_input}/>
                    <View style={{flex: 2}}/>
                    <TouchableOpacity style={styles.join_button} onPress={() => joinFunction(code)}>
                        <Text style={styles.join_button_text}>참여하기</Text>
                    </TouchableOpacity>
                    <View style={{flex: 2}}/>
                </View>

                <View style={{flex: 3}}/>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
