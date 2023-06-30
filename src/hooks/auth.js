import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUser} from "../module/auth";

/**
 * 현재 로그인한 유저 정보를 불러옵니다.
 * @returns {{user_id:int, auth_id:string, username:string, email:string, profile:string}}
 */
export function useFetchUser() {

    const dispatch = useDispatch();
    const {user} = useSelector(({auth}) => auth);

    useEffect(() => {
        if (user === null) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);

    return user;
}
