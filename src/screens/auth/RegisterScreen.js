import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import {useEffect, useState,} from "react";
import {checkDuplicate, register, resetDuplicate, resetRegister} from "../../module/auth";
import {useDispatch, useSelector} from "react-redux";
import Toast from "react-native-root-toast";


function RegisterScreen({navigation}) {

    const dispatch = useDispatch();

    const {status} = useSelector(({auth}) => ({
        status: auth.status
    }));

    const [request, setRequest] = useState({
        auth_id: '',
        password: '',
        username: '',
        email: '',
    });

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const {auth_id, password, username, email} = request;

    useEffect(() => {
        if (status.DUPLICATE_CHECKED === 409) {
            Toast.show("중복된 아이디 입니다.",
                {duration: Toast.durations.LONG});
            const resetId = {
                ...request,
                "auth_id": '',
            };
            setRequest(resetId);
            dispatch(resetDuplicate());
        } else if (status.DUPLICATE_CHECKED === 200) {
            Toast.show("사용 가능한 아이디 입니다.",
                {duration: Toast.durations.LONG});
        }

    }, [dispatch, status.DUPLICATE_CHECKED]);

    useEffect(() => {
        if (status.REGISTER === 201) {
            Toast.show("회원가입 성공.",
                {duration: Toast.durations.LONG});
            dispatch(resetRegister());
            navigation.navigate('login');
        } else if (status.REGISTER === 500) {
            Toast.show("서버 문제로 인한 실패.",
                {duration: Toast.durations.LONG});
        }
    }, [dispatch, status.REGISTER]);

    const onChange = (targetName, e) => {
        const {text} = e.nativeEvent;
        const next = {
            ...request,
            [targetName]: text,
        };
        setRequest(next);
    };

    const checkDuplicateId = () => {
        if (auth_id === "") {
            Toast.show("아이디를 입력하세요",
                {duration: Toast.durations.LONG});

        } else {
            dispatch(checkDuplicate(auth_id));

            if (status.DUPLICATE_CHECKED) {
                Toast.show("사용 가능한 아이디 입니다.",
                    {duration: Toast.durations.LONG});
            }
        }
    };

    const conFirmPassword = () => {
        if (password !== passwordConfirm) {
            Toast.show("비밀번호 불일치",
                {duration: Toast.durations.LONG});
            setPasswordConfirm('');
        }
    };

    const onPressRegister = () => {

        // 모든 정보 입력했는지 체크
        let flag = true;
        for (const requestKey in request) {
            if (request[requestKey] === '') {
                flag = false;
            }
        }

        if (flag === false) {
            Toast.show("모든 정보를 입력하세요",
                {duration: Toast.durations.LONG});
        } else {
            // 중복확인 체크
            if (status.DUPLICATE_CHECKED === 200) {
                dispatch(register(request));
            } else {
                Toast.show("아이디 중복확인을 하세요",
                    {duration: Toast.durations.LONG});
            }
        }
    }

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <View style={{flex: 3}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1}}>
                        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain'
                               style={styles.logo_image}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{fontSize: 30, textAlign: 'center'}}>회원가입</Text>
                    </View>
                </View>


                <View style={styles.signup_container}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 2, flexDirection: 'row', width: '90%',}}>
                        <TextInput value={auth_id} style={styles.input_id_text_input}
                                   placeholder='아이디' placeholderTextColor='black'
                                   onChange={e => onChange("auth_id", e)}/>
                        <TouchableOpacity style={styles.duplication_check_button}>
                            <Text style={{textAlign: 'center', fontSize: 15,}}
                                  onPress={() => checkDuplicateId()}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}/>
                    <TextInput value={password} style={styles.text_input}
                               placeholder='비밀번호' placeholderTextColor='black' secureTextEntry={true}
                               onChange={e => onChange("password", e)}/>
                    <View style={{flex: 1}}/>
                    <TextInput value={passwordConfirm} style={styles.text_input} placeholder='비밀번호 재확인'
                               placeholderTextColor='black' secureTextEntry={true}
                               onChangeText={setPasswordConfirm} onBlur={conFirmPassword}/>
                    <View style={{flex: 1}}/>
                    <TextInput value={username} style={styles.text_input}
                               placeholder='닉네임' placeholderTextColor='black'
                               onChange={e => onChange("username", e)}/>
                    <View style={{flex: 1}}/>
                    <TextInput value={email} style={styles.text_input}
                               placeholder='이메일' placeholderTextColor='black'
                               onChange={e => onChange("email", e)}/>
                    <View style={{flex: 1}}/>
                </View>

                <View style={{flex: 2, alignItems: 'center'}}>
                    <TouchableOpacity style={styles.signup_button} onPress={onPressRegister}>
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
