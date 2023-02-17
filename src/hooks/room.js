import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchRooms} from "../module/room";
import {useIsFocused} from "@react-navigation/native";


export const useFetchRoom = () => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {rooms, loading} = useSelector(({auth, room}) => ({
        rooms: room.rooms,
        loading: room.loading.ROOM_FETCH,
    }));

    useEffect(() => {
        dispatch(fetchRooms());
    }, [isFocused]);



    return [rooms, loading];
}
