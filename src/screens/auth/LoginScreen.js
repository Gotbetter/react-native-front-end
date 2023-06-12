import {SafeAreaView, StyleSheet, View} from "react-native";
import {useEffect, useState,} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, resetAllError, resetStatus, setError} from "../../module/auth";
import Logo from "../../components/common/Logo";
import {useIsFocused} from "@react-navigation/native";
import PreventRollUpView from "../../components/common/PreventRollUpView";
import BasicTextInput from "../../components/common/BasicTextInput";
import ActionButton from "../../components/common/ActionButton";
import {RFValue} from "react-native-responsive-fontsize";
import LoginSubOption from "../../components/auth/LoginSubOption";
import ErrorMessage from "../../components/common/ErrorMessage";

function LoginScreen({navigation}) {

    const dispatch = useDispatch();
    /*const {status, error} = useSelector(({auth}) => ({
        status: auth.status.LOGIN,
        error: auth.error.LOGIN,
    }));*/

    const isFocused = useIsFocused();
    const [errorMessage, setErrorMessage] = useState("");

    /*useEffect(() => {
        if (isFocused) {
            setErrorMessage("");
            dispatch(resetAllError());
            dispatch(resetStatus("DUPLICATE_CHECKED"));
            dispatch(resetStatus("PASSWORD_CONFIRMED"));
        }
    }, [isFocused])*/

    /*useEffect(() => {

        /!** status === 200일 경우 로그인 상태*!/
        if (status === 200) {
            navigation.navigate('main');
        }

        /!** 아이디 또는 비밀번호 틀렸을시 오류 메세지 출력 *!/
        if (status === 404) {
            setErrorMessage("아이디 비밀번호를 확인하세요");
            dispatch(resetStatus("LOGIN"));
        }

    }, [dispatch, status]);*/

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

    /** 로그인 버튼 눌렀을 때 **/
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
            dispatch(setError("LOGIN"));
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
        <PreventRollUpView>
            <SafeAreaView style={styles.container}>
                <View style={styles.logo_container}>
                    <Logo size={RFValue(200)}/>
                </View>
                <View style={styles.main_container}>
                    <View style={styles.gap}>
                        <BasicTextInput placeholder={"아이디"}/>
                        <BasicTextInput placeholder={"비밀번호"} secure={true}/>
                        <ErrorMessage message={"아이디와 비밀번호를 확인하세요"}/>
                        <ActionButton name={"로그인"}/>
                        <LoginSubOption navigation={navigation}/>
                    </View>
                </View>
            </SafeAreaView>
        </PreventRollUpView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    logo_container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    main_container: {
        flex: 1.5,
        alignItems: "center",
    },
    gap: {
        flex: 0.5,
        justifyContent: "space-around",
        alignItems: "center",

    },
});

export default LoginScreen;
