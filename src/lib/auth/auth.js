import client from "../client";


export const register = (credentials) => {
    const {auth_id, password, username, email} = credentials;
    console.log(credentials);
    client.post(
        `/users/join`,
        {
            "auth_id" : auth_id,
            password,
            username,
            email,
        },
    );
};

export const checkDuplicate = (auth_id) =>
    client.post(
        `/users/join/verify`,
        {
            "auth_id": auth_id,
        },
    );
