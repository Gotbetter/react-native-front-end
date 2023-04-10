import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {useEffect, useState,} from "react";


import {useDispatch, useSelector} from "react-redux";
import {login, resetError, resetLoginStatus, setLoginError} from "../../module/auth";
import Logo from "../../components/common/Logo";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import LoginTemplate from "../../components/main/LoginTemplate";
import ErrorMessage from "../../components/common/ErrorMessage";
import {useIsFocused} from "@react-navigation/native";


function LoginScreen({navigation}) {

    const dispatch = useDispatch();
    const {status, error} = useSelector(({auth}) => ({
        status: auth.status.LOGIN,
        error: auth.error.LOGIN,
    }));

    const isFocused = useIsFocused();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        if (isFocused) {
            setErrorMessage("");
            dispatch(resetError());
        }
    }, [isFocused])

    useEffect(() => {

        /** status === 200일 경우 로그인 상태*/
        if (status === 200) {
            navigation.navigate('main');
        }

        /** 아이디 또는 비밀번호 틀렸을시 오류 메세지 출력 */
        if (status === 404) {
            setErrorMessage("아이디 비밀번호를 확인하세요");
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
            setErrorMessage("모든 정보를 입력하세요");
            dispatch(setLoginError());
        } else {
            dispatch(login(request));
            const resetRequest = {
                auth_id: '',
                password: '',
            };
            setRequest(resetRequest);
            setErrorMessage("");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Logo size={hp(30)}/>
            </View>
            <LoginTemplate>
                <View style={styles.input_container}>
                    <TextInput style={styles.input}
                               value={auth_id}
                               placeholder="아이디 입력"
                               onChange={(e) => onChange("auth_id", e)}/>
                    <TextInput style={styles.input}
                               value={password}
                               placeholder="비밀번호 입력"
                               onChange={(e) => onChange("password", e)}/>
                </View>
                {
                    error && <ErrorMessage message={errorMessage}/>
                }
                <View style={styles.button_group_container}>
                    <TouchableOpacity style={styles.button} onPress={onPressLogin}>
                        <Text style={styles.login_text}>로그인</Text>
                    </TouchableOpacity>
                    <View style={styles.sub_function_container}>
                        <Text onPress={() => navigation.navigate('register')}>회원가입</Text>
                        <Text>아이디 찾기</Text>
                        <Text>비밀번호 찾기</Text>
                    </View>
                </View>
            </LoginTemplate>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
    },
    logo_container: {
        height: "25%",
        justifyContent: "flex-end",
        alignItems: "center",

    },
    input_container: {
        height: "25%",
        justifyContent: "space-between",
    },
    input: {
        padding: wp(2),
        height: "45%",
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: '#EDEDED',
    },
    button_group_container: {
        marginTop: wp(2),
        height: "25%",
    },
    button: {
        borderWidth: 1,
        backgroundColor: "#000000",
        justifyContent: "space-around",
        alignItems: "center",
        height: "45%",
        padding: wp(2),
    },
    sub_function_container: {
        height: "45%",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    login_text: {
        color: "#ffffff",
        fontSize: wp(5),
    },
});

export default LoginScreen;
