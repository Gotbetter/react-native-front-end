import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {useEffect} from "react";
import {useSelector} from "react-redux";

function HomeScreen(props) {

    const {user, status} = useSelector(({auth}) => ({
        user: auth.user,
        status: auth.status.LOGIN,
    }));

    useEffect(() => {

    }, []);


    if (user && status) {
        return (
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={{fontSize: 30, textAlign: 'center'}}>홈화면</Text>
                    <Text style={{fontSize: 30, textAlign: 'center'}}>{user.username}</Text>
                    <Text style={{fontSize: 30, textAlign: 'center'}}>{user.email}</Text>
                </View>

            </TouchableWithoutFeedback>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default HomeScreen;
