import React from 'react';
import {Image, StyleSheet} from "react-native";

function Logo(props) {
    return (
        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain'
               style={styles.logo_image}/>
    );
}

const styles = StyleSheet.create(
    {
        logo_image: {
            flex: 1,
            alignSelf: 'center',
            width: '80%',
        },
    }
);
export default Logo;
