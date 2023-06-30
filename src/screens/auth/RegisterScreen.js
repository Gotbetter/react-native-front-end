import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import {useCallback, useEffect,} from "react";
import {useDispatch, useSelector} from "react-redux";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ErrorMessage from "../../components/common/ErrorMessage";
import ConfirmMessage from "../../components/common/ConfirmMessage";
import ActionButton from "../../components/common/ActionButton";
import {RFValue} from "react-native-responsive-fontsize";
import BasicTextInput from "../../components/common/BasicTextInput";
import {
    checkDuplicate,
    checkPasswordConfirm,
    onChangeRegisterRequest,
    register,
    resetAllStatusAndError
} from "../../module/auth";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-root-toast";


function RegisterScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const {
        request,
        password_confirm,
        status, error, message
    } = useSelector(({auth}) => (auth.register));

    const {auth_id, password, username, email} = request;

    /** 회원가입 화면 벗어날 경우 관련 state 초기화 **/
    useEffect(() => {

        if (status.REGISTER_SUCCESS) {
            navigation.navigate('login');
            Toast.show("회원가입 성공", {duration: Toast.durations.SHORT});
        }

        return () => dispatch(resetAllStatusAndError());
    }, [status.REGISTER_SUCCESS]);

    const onChange = (e, targetName) => {
        dispatch(onChangeRegisterRequest({targetName, value: e.nativeEvent.text}))
    };
    /** 아이디 중복확인 **/
    const checkAuthIdDuplicate = useCallback(() => {
        dispatch(checkDuplicate());
    }, []);

    /** 패스워드 재확인 **/
    const confirmPassword = useCallback(() => {
        dispatch(checkPasswordConfirm());
    }, []);

    /** 회원가입 **/
    const onPressRegister = useCallback(() => {
        dispatch(register());
    }, []);

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
                {/* 회원가입에 필요한 정보 입력하는 부분 */}
                <View style={styles.main_container}>
                    {/* 아이디 입력 및 중복확인 */}
                    <View style={styles.input_group_container}>
                        <Text style={styles.input_title_text}>아이디</Text>
                        <View style={styles.duplicate_check_group}>
                            <BasicTextInput style={{width: wp(56)}} dark={true}
                                            placeholder={"아이디"}
                                            name={"auth_id"}
                                            다 value={auth_id}
                                            onChangeText={onChange}/>
                            {/* 중복확인 버튼 */}
                            <TouchableOpacity style={styles.duplicate_button} onPress={checkAuthIdDuplicate}>
                                <Text style={styles.duplicate_button_text}>중복확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* 아이디 중복 확인 실패 메세지 */}
                    <ErrorMessage message={message.DUPLICATE_CHECK_MESSAGE}
                                  visible={error.DUPLICATED_AUTH_ID}/>
                    {/* 아이디 중복 확인 성공 메세지 */}
                    <ConfirmMessage message={message.DUPLICATE_CHECK_MESSAGE}
                                    visible={status.AUTH_ID_DUPLICATE_CHECKED}/>


                    {/* 비밀번호 입력 및 확인 */}
                    <View style={styles.password_group_container}>
                        <Text style={styles.input_title_text}>비밀번호</Text>
                        <BasicTextInput placeholder={"비밀번호"} secure={true} dark={true}
                                        name={"password"}
                                        value={password}
                                        onChangeText={onChange}/>
                        <BasicTextInput placeholder={"비밀번호 확인"} secure={true} dark={true}
                                        value={password_confirm}
                                        name={"password_confirm"}
                                        onChangeText={onChange}
                                        onBlur={confirmPassword}
                        />
                    </View>
                    {/* 비밀번호 일치 확인 실패 메세지 */}
                    <ErrorMessage message={message.PASSWORD_CONFIRM_MESSAGE}
                                  visible={error.FAILED_PASSWORD_CONFIRM}/>
                    {/* 비밀번호 일치 확인 성공 메세지 */}
                    <ConfirmMessage message={message.PASSWORD_CONFIRM_MESSAGE}
                                    visible={status.PASSWORD_CONFIRMED}/>

                    {/* 이메일 입력 */}
                    <View style={styles.input_group_container}>
                        <Text style={styles.input_title_text}>이메일</Text>
                        <BasicTextInput placeholder={"이메일 주소"} dark={true}
                                        name={"email"}
                                        value={email}
                                        onChangeText={onChange}/>
                    </View>
                    {/* 닉네임 입력 */}
                    <View style={styles.input_group_container}>
                        <Text style={styles.input_title_text}>닉네임</Text>
                        <BasicTextInput placeholder={"닉네임"} dark={true}
                                        name={"username"}
                                        value={username}
                                        onChangeText={onChange}/>
                    </View>
                </View>

                {/* 회원가입 버튼 */}
                <View style={styles.button_container}>
                    {/* 중복된 이메일, 400 Error 매새자 */}
                    <ErrorMessage message={message.REGISTER_FAILED_MESSAGE}
                                  visible={error.REGISTER_FAILED}/>
                    <ActionButton name={"회원가입"} onPress={onPressRegister}/>
                </View>

            </SafeAreaView>
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create(
    {
        screen: {
            backgroundColor: "#F5F5F5",
            height: hp(100),
        },
        container: {
            flex: 1,
            alignItems: "center"
        },
        title_container: {
            flex: 0.5,
            borderBottomWidth: 1,
            paddingBottom: 40,
            borderColor: "#EEEEEE",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",

        },
        main_container: {
            flex: 3,
            marginTop: RFValue(16),
        },
        input_group_container: {
            height: hp(12),
            justifyContent: "space-around",

        },
        password_group_container: {
            height: hp(20),
            justifyContent: "space-around"
        },
        button_container: {
            flex: 0.5,
            justifyContent: "space-around",
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
            fontWeight: "600",
        },

    }
);
export default RegisterScreen;
