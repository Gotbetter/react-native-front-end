import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {useEffect, useState,} from "react";
import Toast from "react-native-root-toast";


import {useDispatch, useSelector} from "react-redux";
import {login, resetLoginStatus} from "../../module/auth";
import Logo from "../../components/common/Logo";
import PreventRollUpView from "../../components/common/PreventRollUpView";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";


function LoginScreen({navigation}) {

    const dispatch = useDispatch();
    const {status} = useSelector(({auth}) => ({
        status: auth.status.LOGIN
    }));

    useEffect(() => {

        /** status === 200일 경우 로그인 상태*/
        if (status === 200) {
            navigation.navigate('main');
        }

        /** 아이디 또는 비밀번호 틀렸을시 오류 메세지 출력 */
        if (status === 404) {
            Toast.show('아이디 비밀번호를 확인하세요', {duration: Toast.durations.LONG});
            dispatch(resetLoginStatus());
        }

    }, [dispatch, status]);
    const [request, setRequest] = useState({
        auth_id: '',
        password: '',
    });

    const {auth_id, password} = request;


    const onChange = (targetName, e) => {
        const {text} = e.nativeEvent;
        const next = {
            ...request,
            [targetName]: text,
        };
        setRequest(next);
    };

    const onPressLogin = () => {
        let flag = true;
        for (const requestKey in request) {
            if (request[requestKey] === '') {
                flag = false;
                break;
            }
        }

        if (flag === false) {
            Toast.show('모든 정보를 입력하세요', {duration: Toast.durations.SHORT});
        } else {
            dispatch(login(request));
            const resetRequest = {
                auth_id: '',
                password: '',
            };
            setRequest(resetRequest);
        }
    }

    return (
        <PreventRollUpView>
            <View style={styles.container}>

                <View style={{flex: 3}}>
                    <View style={{flex: 1}}/>
                    <View style={styles.logo_container}>
                        <Logo size={wp(70)}/>
                    </View>
                </View>
                <View style={styles.login_container}>
                    <View style={{flex: 1}}/>
                    <TextInput value={auth_id} style={styles.text_input} placeholder='아이디' placeholderTextColor='black'
                               onChange={(e) => onChange("auth_id", e)}/>
                    <View style={{flex: 1}}/>
                    <TextInput value={password} style={styles.text_input} placeholder='비밀번호'
                               placeholderTextColor='black'
                               onChange={(e) => onChange("password", e)} secureTextEntry={true}/>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.login_button} onPress={onPressLogin}>
                        <Text style={styles.login_button_text}>로그인</Text>
                    </TouchableOpacity>

                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('register')} style={{flex: 1}}>
                            <Text style={styles.add_on_text}>회원가입</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}}>
                            <Text style={styles.add_on_text}>아이디 찾기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 1}}>
                            <Text style={styles.add_on_text}>비밀번호 찾기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex: 2}}/>

            </View>
        </PreventRollUpView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    login_container: {
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
    login_button: {
        flex: 2,
        width: '90%',
        backgroundColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },
    login_button_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 30,
    },
    add_on_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 15,
    }
});

export default LoginScreen;
