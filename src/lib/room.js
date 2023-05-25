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
export const fetchParticipants = ({room_id, accepted}) =>
    client.get(
        `/participants/${room_id}`,
        {
            params: {
                accepted
            },
        }
    );
export const fetchRank = (room_id) =>
    client.get(`/rooms/${room_id}/rank`,);
export const fetchRefund = (participant_id) =>
    client.get(`/participants/${participant_id}/refund`);
export const approveEntrance = ({user_id, room_id}) =>
    client.patch(`/participants`,
        {
            user_id,
            room_id,
        });
