import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,

    StyleSheet,
} from "react-native";

import {
    useState,
    useEffect,
} from "react";
import {register} from "../module/auth";
import {useDispatch} from "react-redux";

function RegisterScreen({navigation}) {

    const dispatch = useDispatch();


    const [inputId, setInputId] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordCheck, setInputPasswordCheck] = useState('');
    const [inputNickname, setInputNickname] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    const goToSigninPage = () => {
        navigation.navigate('login');
    }



    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <View style={{flex: 3}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1}}>
                        <Image source={require('../../assets/images/logo.png')} resizeMode='contain'
                               style={styles.logo_image}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{fontSize: 30, textAlign: 'center'}}>회원가입</Text>
                    </View>
                </View>


                <View style={styles.signup_container}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 2, flexDirection: 'row', width: '90%',}}>
                        <TextInput style={styles.input_id_text_input} placeholder='아이디' placeholderTextColor='black'
                                   onChangeText={setInputId}/>
                        <TouchableOpacity style={styles.duplication_check_button}>
                            <Text style={{textAlign: 'center', fontSize: 15,}}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}/>
                    <TextInput style={styles.text_input} placeholder='비밀번호' placeholderTextColor='black'
                               onChangeText={setInputPassword} secureTextEntry={true}/>
                    <View style={{flex: 1}}/>
                    <TextInput style={styles.text_input} placeholder='비밀번호 재확인' placeholderTextColor='black'
                               onChangeText={setInputPasswordCheck} secureTextEntry={true}/>
                    <View style={{flex: 1}}/>
                    <TextInput style={styles.text_input} placeholder='닉네임' placeholderTextColor='black'
                               onChangeText={setInputNickname}/>
                    <View style={{flex: 1}}/>
                    <TextInput style={styles.text_input} placeholder='이메일' placeholderTextColor='black'
                               onChangeText={setInputEmail}/>
                    <View style={{flex: 1}}/>
                </View>

                <View style={{flex: 2, alignItems: 'center'}}>
                    <TouchableOpacity style={styles.signup_button} onPress={goToSigninPage}>
                        <Text style={styles.signup_button_text}>회원가입</Text>
                    </TouchableOpacity>
                    <View style={{flex: 2}}/>
                </View>

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
    signup_container: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_input: {
        flex: 2,
        width: '90%',
        backgroundColor: '#EDEDED',
        borderRadius: 20,
        paddingLeft: 20,
        fontSize: 15,
    },
    input_id_text_input: {
        flex: 2,
        backgroundColor: '#EDEDED',
        paddingLeft: 20,
        fontSize: 15,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    duplication_check_button: {
        flex: 1,
        backgroundColor: '#BFBFBF',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    signup_button: {
        flex: 1,
        width: '90%',
        backgroundColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },
    signup_button_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 30,
    },
});
export default RegisterScreen;
