import client from "./client";


export const register = (credentials) => {
    const {auth_id, password, username, email} = credentials;
    client.post(
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

export const refresh = (refreshToken) =>
    client.post(
        `/users/reissue`,
        {},
        {
            headers: {
                authorization: `Bearer ${refreshToken}`,
            },
        }
    );
