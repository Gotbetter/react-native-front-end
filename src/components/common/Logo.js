import React from 'react';
import {Image, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Logo() {
    return (
        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain'
               style={styles.logo_image}/>
    );
}

const styles = StyleSheet.create(
    {
        logo_image: {
            width: wp(40),
        },
    }
);
export default Logo;
