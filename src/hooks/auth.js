import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUser} from "../module/auth";



export const useLocalStorage = () => {

    const dispatch = useDispatch();
    const [token, setToken] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("auth", (error, token) => {
            try {
                setToken(token);
            } catch (error) {
                console.log(error);
            }
        });
    }, [dispatch, token]);

    return token;
}
