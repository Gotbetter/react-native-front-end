import {Text, View, StyleSheet} from 'react-native';

import ContinueButton from "../../../components/room/form/ContinueButton";
import SelectGroup from "../../../components/room/form/SelectGroup";
import InputGroup from "../../../components/room/form/InputGroup";
import Logo from "../../../components/common/Logo";

function RoomTitleFormContainer({navigation}) {

    const SCREEN_TITLE = "새로운 스터디방 만들기";
    const INPUT_TITLE = "스터디방 이름";
    const SELECT_TITLE = "스터디방 인원"

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                <InputGroup title={INPUT_TITLE}/>
                <InputGroup title={SELECT_TITLE}>
                    <SelectGroup/>
                </InputGroup>
                <ContinueButton onPress={() => navigation.navigate('room-create-schedule-form')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white',
        },

        content_container: {
            flex: 2,
            alignItems: "center",
        },

        screen_title: {
            alignItems: 'flex-start',
            fontSize: 22,
            width: '90%',
            fontWeight: 'bold',
        },
    }
);
export default RoomTitleFormContainer;
