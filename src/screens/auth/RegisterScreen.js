import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import {useEffect, useState,} from "react";
import {checkDuplicate, passwordConfirmed, register, resetError, resetStatus, setError} from "../../module/auth";
import {useDispatch, useSelector} from "react-redux";
import Toast from "react-native-root-toast";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ErrorMessage from "../../components/common/ErrorMessage";
import ConfirmMessage from "../../components/common/ConfirmMessage";
import ActionButton from "../../components/common/ActionButton";
import {RFValue} from "react-native-responsive-fontsize";
import BasicTextInput from "../../components/common/BasicTextInput";


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
            contentContainerStyle={styles.screen}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.title_container}>
                    <Text style={styles.title_text}>회원가입</Text>
                </View>
                <View style={styles.main_container}>
                    <View style={styles.input_group_container}>
                        <Text style={styles.input_title_text}>아이디</Text>
                        <View style={styles.duplicate_check_group}>
                            <BasicTextInput placeholder={"아이디"} dark={true} style={{width: wp(56)}}/>
                            <TouchableOpacity style={styles.duplicate_button}>
                                <Text style={styles.duplicate_button_text}>중복확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ConfirmMessage message={"사용 가능한 아이디입니다."} visible={true}/>


                    <View style={styles.password_group_container}>
                        <Text style={styles.input_title_text}>비밀번호</Text>
                        <BasicTextInput placeholder={"비밀번호"} secure={true} dark={true}/>
                        <BasicTextInput placeholder={"비밀번호 확인"} secure={true} dark={true}/>
                    </View>
                    <ErrorMessage message={"비밀번호가 일치 하지 않습니다"} visible={true}/>


                    <View style={styles.input_group_container}>
                        <Text style={styles.input_title_text}>이메일</Text>
                        <BasicTextInput placeholder={"이메일 주소"} dark={true}/>
                    </View>
                    <View style={styles.input_group_container}>
                        <Text style={styles.input_title_text}>닉네임</Text>
                        <BasicTextInput placeholder={"닉네임"} dark={true}/>
                    </View>
                </View>
                <View style={styles.button_container}>
                    <ActionButton name={"회원가입"}/>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>

    );
}


const styles = StyleSheet.create(
    {
        screen: {
            backgroundColor: "Gray 100",
            height: hp(100),
        },
        container: {
            flex: 1,
            alignItems: "center"
        },
        title_container: {
            flex: 0.5,
            justifyContent: "center",
        },
        main_container: {
            flex: 3,
        },
        input_group_container: {
            height: hp(12),
            justifyContent: "space-around"
        },
        password_group_container: {
            height: hp(20),
            justifyContent: "space-around"
        },
        button_container: {
            flex: 0.5,
            justifyContent: "center",
        },
        title_text: {
            fontSize: RFValue(16),
            fontWeight: "500",
        },
        input_title_text: {
            color: "#BDBDBD",
            paddingLeft: 5,
            fontWeight: "500",
        },
        duplicate_check_group: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

        },
        duplicate_button: {
            backgroundColor: "#E0E0E0",
            width: wp(32),
            height: "100%",
            borderRadius: 10,

            justifyContent: "center",
            alignItems: "center",
        },
        duplicate_button_text: {
            color: "#9E9E9E",
            fontWeight: "700",
        },

    }
);
export default RegisterScreen;
