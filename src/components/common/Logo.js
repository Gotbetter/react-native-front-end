import React from 'react';
import {Image, StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Logo({size}) {
    return (
        <Image source={require('../../../assets/images/logo.png')} resizeMode='contain'
               style={{width: size}}/>
    );
}

export default Logo;
