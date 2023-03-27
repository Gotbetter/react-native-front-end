import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

function DetailPlanInput({
                             addButtonPressed,
                             modifyButtonPressed,
                             onPressAddButton,
                             onPressAddDetailPlan,
                             onPressModifyDetailPlan,
                             onChangeRequest
                         }) {

    const notPressedAnyButton = () => {
        return !(addButtonPressed || modifyButtonPressed)
    }

    if (notPressedAnyButton()) {
        return <AddButton onPress={onPressAddButton}/>
    } else if (addButtonPressed) {
        return <Input
            onPressButton={onPressAddDetailPlan}
            onChangeRequest={onChangeRequest}
            inputName={'추가'}
        />;
    } else if (modifyButtonPressed) {
        return <Input
            onPressButton={onPressModifyDetailPlan}
            onChangeRequest={onChangeRequest}
            inputName={'수정'}
        />;
    }

}


const AddButton = ({onPress}) => {
    return (
        <TouchableOpacity key={10000} style={styles.add_plan}
                          onPress={onPress}
        >
            <Text style={styles.detail_plan_text}>추가하기</Text>
        </TouchableOpacity>
    )
};

const Input = ({onChangeRequest, onPressButton, inputName}) => {
    return (
        <View style={styles.input_group}>
            <TextInput style={styles.input} placeholder={'세부 계획 입력'} onChangeText={(text) => onChangeRequest(text)}/>
            <TouchableOpacity style={styles.add_button}>
                <Text onPress={onPressButton}>{inputName}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        input_group: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: 'black',
            width: wp(80),
            height: hp(7),
            marginTop: "5%",
            borderRadius: 20,
        },
        input: {
            width: '88%',
            height: '100%',
            padding: '5%',
        },
        add_button: {
            borderLeftWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '12%'
        },
        add_plan: {
            flex: 1,
            width: wp(80),
            height: hp(6),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: "5%",
            flexDirection: 'row',
            backgroundColor: '#DFDFDF'
        },
    }
);

export default DetailPlanInput;
