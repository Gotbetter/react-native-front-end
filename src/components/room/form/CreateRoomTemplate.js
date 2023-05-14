import React from 'react';
import {StyleSheet} from "react-native";
import HeaderTemplate from "../../common/HeaderTemplate";
import RoomCreateHeader from "./RoomCreateHeader";
import PreventRollUpView from "../../common/PreventRollUpView";

function CreateRoomTemplate({children}) {
    return (
        <PreventRollUpView style={styles.container}>
            <HeaderTemplate>
                <RoomCreateHeader/>
            </HeaderTemplate>
            {children}
        </PreventRollUpView>
    );
}


const styles = StyleSheet.create(
    {
        container: {
            width: "100%",
            height: "100%",
        },
    }
);

export default CreateRoomTemplate;
