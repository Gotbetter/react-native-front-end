import client from "./client";


/**
 * @param credentials
 * string auth_id;
 * string password;
 * string username;
 * string email;
 */
export const register = (credentials) => {
    const {auth_id, password, username, email} = credentials;
    return client.post(
        `/users`,
        {
            "auth_id": auth_id,
            password,
            username,
            email,
        },
    );
};
export const checkDuplicate = (auth_id) =>{
    return client.post(
        `/users/verify`,
        {
            "auth_id": auth_id,
        },
    );
}

/**
 *
 * @param credentials
 * auth_id: string
 * password: string
 * @returns {
 *     access_token: string,
 *     refresh_token: string
 * }
 */
export const login = (credentials) => {
    const {auth_id, password} = credentials;
    return client.post(
        `/users/login`,
        {
            "auth_id": auth_id,
            password,
        }
    );
};

/**
 * @returns {
 *     access_token: string,
 *     refresh_token: string
 * }
 */
export const refresh = () =>
    client.post(
        `/users/reissue`,
        {},
    );

export const fetchUser = () =>
    client.get(
        `/users`
    );
