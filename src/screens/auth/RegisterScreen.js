import {StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";

import {useEffect, useState,} from "react";
import {checkDuplicate, passwordConfirmed, register, resetError, resetStatus, setError} from "../../module/auth";
import {useDispatch, useSelector} from "react-redux";
import Toast from "react-native-root-toast";
import Logo from "../../components/common/Logo";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ErrorMessage from "../../components/common/ErrorMessage";
import ConfirmMessage from "../../components/common/ConfirmMessage";


function RegisterScreen({navigation}) {

    const dispatch = useDispatch();

    const {status, error} = useSelector(({auth}) => (auth));

    const [request, setRequest] = useState({
        auth_id: '',
        password: '',
        username: '',
        email: '',
    });

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const {auth_id, password, username, email} = request;

    /**
     * Error Message State
     * 중복확인
     * 패스워드 재확인
     * 이메일 중복
     * 다 안 채움
     * **/
    const [duplicateErrorMessage, setDuplicateErrorMessage] = useState("");
    const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [requiredErrorMessage, setRequiredErrorMessage] = useState("");

    /**
     * Confirm Message State
     * 중복확인 통과
     * 비밀번호 확인 통과
     */
    const [duplicateConfirmMessage, setDuplicateConfirmMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");


    useEffect(() => {
        if (status.DUPLICATE_CHECKED === 409) {
            setDuplicateErrorMessage("중복된 아이디 입니다.");
            dispatch(setError("DUPLICATE_CHECK"));
            dispatch(resetStatus("DUPLICATE_CHECKED"));
            const resetId = {
                ...request,
                "auth_id": '',
            };
            setRequest(resetId);
        } else if (status.DUPLICATE_CHECKED === 200) {
            dispatch(resetError("DUPLICATE_CHECKED"));
            setDuplicateConfirmMessage("사용 가능한 아이디 입니다.");
        }

    }, [dispatch, status.DUPLICATE_CHECKED]);

    useEffect(() => {
        if (status.REGISTER === 201) {
            Toast.show("회원가입 성공.",
                {duration: Toast.durations.LONG});
            dispatch(resetStatus("REGISTER"));
            navigation.navigate('login');
        } else if (status.REGISTER === 409) {
            setEmailErrorMessage("중복된 이메일은 불가능합니다.");
            dispatch(setError("EMAIL_CHEKC"));
            dispatch(resetStatus("REGISTER"));
        } else if (status.REGISTER === 500) {
            Toast.show("서버 문제로 인한 실패.",
                {duration: Toast.durations.LONG});
        }
    }, [dispatch, status.REGISTER]);

    const onChange = (targetName, e) => {

        /** 아이디 중복 확인 이후 변경이 생길 경우 중복확인 reset **/
        if (targetName === "auth_id" && status.DUPLICATE_CHECKED) {
            dispatch(resetStatus("DUPLICATE_CHECKED"));
        }

        /** 패스워드 확인 이후 변경이 생긴다면 패스워드 확인 reset **/
        if (targetName === "password" && status.PASSWORD_CONFIRMED) {
            dispatch(resetStatus("PASSWORD_CONFIRMED"));
        }

        const {text} = e.nativeEvent;
        const next = {
            ...request,
            [targetName]: text,
        };
        setRequest(next);
    };

    /** 아이디 중복확인 **/
    const checkDuplicateId = () => {
        if (auth_id === "") {
            setDuplicateErrorMessage("아이디를 입력하세요")
            return;
        }
        dispatch(checkDuplicate(auth_id));
    };

    /** 패스워드 확인 **/
    const conFirmPassword = () => {
        if (password !== passwordConfirm) {
            dispatch(setError("PASSWORD_CONFIRM"));
            if (status.PASSWORD_CONFIRMED) {
                dispatch(resetStatus("PASSWORD_CONFIRMED"));
            }
            setPasswordConfirmErrorMessage("비밀번호 불일치");
            setPasswordConfirm("");
        } else {
            dispatch(resetError("PASSWORD_CONFIRM"));
            dispatch(passwordConfirmed());
            setPasswordConfirmMessage("사용가능한 비밀번호 입니다.");
        }
    };

    /** 회원가입 버튼 눌렀을 때 **/
    const onPressRegister = () => {

        /** 아이디 중복확인 **/
        if (status.DUPLICATE_CHECKED !== 200) {
            dispatch(setError("DUPLICATE_CHECK"));
            setDuplicateErrorMessage("아이디 중복확인을 하세요");
            return;
        }

        /** 패스워드 재확인 **/
        if (!status.PASSWORD_CONFIRMED) {
            dispatch(setError("PASSWORD_CONFIRM"));
            setPasswordConfirmErrorMessage("비밀번호 재확인을 하세요");
            return;
        }

        /** 모든 정보 입력했는지 **/
        let flag = true;
        for (const requestKey in request) {
            if (request[requestKey] === '') {
                flag = false;
            }
        }

        if (flag === false) {
            dispatch(setError("REGISTER_REQUIRED"));
            dispatch(setError())
            setRequiredErrorMessage("모든 정보를 입력하세요");
            return;
        }

        dispatch(register(request));
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            style={styles.screen}
            contentContainerStyle={styles.container}
        >
            <View style={styles.logo_container}>
                <Logo size={hp(30)}/>
            </View>
            <View style={styles.input_container}>

                <View style={styles.id_input_group}>
                    <TextInput
                        style={styles.input_id}
                        value={auth_id}
                        onChange={(e) => onChange("auth_id", e)}
                        placeholder={"아이디"}
                        placeholderTextColor={"#000000"}
                    />
                    <TouchableOpacity style={styles.duplicate} onPress={checkDuplicateId}>
                        <Text style={styles.button_text}>중복 확인</Text>
                    </TouchableOpacity>
                </View>
                {error.DUPLICATE_CHECK && <ErrorMessage message={duplicateErrorMessage}/>}
                {status.DUPLICATE_CHECKED === 200 && <ConfirmMessage message={duplicateConfirmMessage}/>}
                <View style={styles.input_group}>
                    <TextInput
                        style={styles.input}
                        value={password}
                        secureTextEntry={true}
                        onChange={(e) => onChange("password", e)}
                        placeholder={"비밀번호"}
                        placeholderTextColor={"#000000"}
                    />
                </View>
                <View style={styles.input_group}>
                    <TextInput style={styles.input}
                               value={passwordConfirm}
                               secureTextEntry={true}
                               onBlur={conFirmPassword}
                               onChangeText={setPasswordConfirm}
                               placeholder={"비밀번호 재확인"}
                               placeholderTextColor={"#000000"}
                    />
                </View>
                {error.PASSWORD_CONFIRM && <ErrorMessage message={passwordConfirmErrorMessage}/>}
                {status.PASSWORD_CONFIRMED && <ConfirmMessage message={passwordConfirmMessage}/>}
                <View style={styles.input_group}>
                    <TextInput style={styles.input}
                               value={username}
                               onChange={(e) => onChange("username", e)}
                               placeholder={"닉네임"}
                               placeholderTextColor={"#000000"}
                    />
                </View>
                <View style={styles.input_group}>
                    <TextInput style={styles.input}
                               value={email}
                               onChange={(e) => onChange("email", e)}
                               placeholder={"이메일"}
                               placeholderTextColor={"#000000"}
                    />
                </View>
                {error.EMAIL_CHECK && <ErrorMessage message={emailErrorMessage}/>}
                {error.REGISTER_REQUIRED && <ErrorMessage message={requiredErrorMessage}/>}
                <TouchableOpacity style={styles.button} onPress={onPressRegister}>
                    <Text style={styles.button_text}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>

    );
}


const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
    },
    container: {
        height: hp(100),
    },
    logo_container: {
        height: "25%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    input_container: {
        height: "75%",
        padding: wp(3),
    },
    input_group: {
        height: hp(10),
        justifyContent: "center",
    },
    id_input_group: {
        height: hp(7),
        flexDirection: "row",
    },
    title_text: {
        fontSize: wp(5),
    },
    input: {
        borderWidth: 1,
        padding: wp(2),
        height: "70%",
        borderColor: "#000000",
        backgroundColor: '#EDEDED',
    },
    input_id: {
        borderColor: "#000000",
        backgroundColor: '#EDEDED',
        borderWidth: 1,
        width: "70%",
        padding: wp(2),

    },
    duplicate: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000"
    },
    button: {
        borderWidth: 1,
        backgroundColor: "#000000",
        justifyContent: "space-around",
        alignItems: "center",
        height: "12%",
        padding: wp(2),
    },
    button_text: {
        color: "#ffffff",
        fontSize: wp(5),
    },


});
export default RegisterScreen;
