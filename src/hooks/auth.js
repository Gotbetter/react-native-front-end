import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * 로컬 스토리지에 저장된 access_token을 가져오고 return
 * @returns {string}
 */
export const useLocalStorage = () => {

    const dispatch = useDispatch();
    const [token, setToken] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("access_token")
            .then(accessToken => {
                console.log(accessToken);
                setToken(accessToken);
            })
            .catch(err => {
                console.log(err);
            });
    }, [dispatch, token]);

    return token;
}
