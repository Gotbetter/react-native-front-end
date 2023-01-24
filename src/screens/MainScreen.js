import React from 'react';
import MainContainer from "../container/MainContainer";

function MainScreen({navigation}) {
    return (
        <>
            {/* header container */}
            <MainContainer navigation={navigation}/>
            {/* footer container */}
        </>
    );
}

export default MainScreen;
