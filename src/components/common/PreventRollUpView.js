import React from 'react';
import {useWindowDimensions, View} from "react-native";

function PreventRollUpView({children}) {
    const windowHeight = useWindowDimensions().height;
    return (
        <View style={{minHeight: Math.round(windowHeight)}}>
            {children}
        </View>
    );
}

export default PreventRollUpView;
