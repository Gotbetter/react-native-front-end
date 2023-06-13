import {SafeAreaView, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {login, onChangeLoginRequest, resetAllStatusAndError} from "../../module/auth";
import Logo from "../../components/common/Logo";
import PreventRollUpView from "../../components/common/PreventRollUpView";
import BasicTextInput from "../../components/common/BasicTextInput";
import ActionButton from "../../components/common/ActionButton";
import {RFValue} from "react-native-responsive-fontsize";
import LoginSubOption from "../../components/auth/LoginSubOption";
import ErrorMessage from "../../components/common/ErrorMessage";
import {useEffect} from "react";
import Toast from "react-native-root-toast";

function LoginScreen({navigation}) {

    const dispatch = useDispatch();

    const {request, status, error, LOGIN_FAILED_MESSAGE} = useSelector(({auth}) => (auth.login));
    const {auth_id, password} = request;

    useEffect(() => {
        if (status.LOGIN_SUCCESS) {
            navigation.navigate('main');
            Toast.show("로그인 성공", {duration: Toast.durations.SHORT});
        }

        return () => dispatch(resetAllStatusAndError());
    }, [status.LOGIN_SUCCESS]);

    const onChange = (e, targetName) => {
        dispatch(onChangeLoginRequest({targetName, value: e.nativeEvent.text}));
    };

    /** 로그인 버튼 눌렀을 때 **/
    const onPressLogin = () => {
        dispatch(login());
    };

    return (
        <PreventRollUpView>
            <SafeAreaView style={styles.container}>
                <View style={styles.logo_container}>
                    <Logo size={RFValue(200)}/>
                </View>
                <View style={styles.main_container}>
                    <View style={styles.gap}>
                        <BasicTextInput placeholder={"아이디"} name={"auth_id"} value={auth_id}
                                        onChangeText={onChange}/>
                        <BasicTextInput placeholder={"비밀번호"} secure={true} name={"password"} value={password}
                                        onChangeText={onChange}/>
                        <ErrorMessage visible={error.LOGIN_FAILED} message={LOGIN_FAILED_MESSAGE}/>
                        <ActionButton name={"로그인"} onPress={onPressLogin}/>
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
