import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchRooms} from "../module/room";
import {useIsFocused} from "@react-navigation/native";


export const useFetchRoom = () => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {roomList, loading} = useSelector(({auth, room}) => ({
        roomList: room.roomList,
    }));

    useEffect(() => {
        if (isFocused == true) {
            dispatch(fetchRooms());
        }
    }, [dispatch, isFocused]);


    return [roomList, loading];
}
