import client from "./client";

export const fetchRooms = () =>
    client.get(`/rooms`);
export const fetchRoom = ({room_id, query}) =>
    client.get(
        `/rooms/${room_id}`,
        {
            params: {
                ...query,
            },
        }
    );

export const fetchRules = () =>
    client.get(`/rules`);

export const createRoom = (request) => {

    const {title, max_user_num, start_date, week, current_week, entry_fee, rule_id, account} = request;
    return client.post(
        `/rooms`,
        {
            title,
            max_user_num,
            start_date,
            week,
            current_week,
            entry_fee,
            rule_id,
            account
        },
    );
};

export const joinRoom = (room_code) =>
    client.post(
        `/rooms/join`,
        {
            room_code
        },
    );
