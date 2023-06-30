import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchRoom, fetchRooms} from "../module/room";
import {useIsFocused} from "@react-navigation/native";
import useUpdateEffect from "./common";
import {fetchDetailPlan, fetchPlan} from "../lib/plans";


/**
 * 현재 들어온 방 정보를 불러옵니다.
 * @param {number} room_id - 방 ID
 * @returns {object} - 방 정보 객체
 *     - room_id {number} - 방 ID
 *     - title {string} - 방 제목
 *     - max_user_num {number} - 최대 사용자 수
 *     - current_user_num {number} - 현재 사용자 수
 *     - start_date {string} - 시작 날짜
 *     - week {number} - 총 주차 수
 *     - current_week {number} - 현재 주차
 *     - entry_fee {number} - 입장료
 *     - room_code {string} - 방 코드
 *     - account {string} - 계좌 정보
 *     - total_entry_fee {number} - 총 입장료
 *     - rule_id {number} - 규칙 ID
 */
export function useFetchRoomInfo(room_id) {
    const dispatch = useDispatch();
    const {roomInfo} = useSelector(({room}) => room);

    useEffect(() => {
        /** 현재 방 정보 불러오기 **/
        if (roomInfo === null) {
            dispatch(fetchRoom({room_id}));
        }
    }, [dispatch, room_id]);

    return roomInfo;
}

/**
 * 현재 참여하고 있는 스터디 룸의 리스트를 불러옵니다.
 * * @returns {[object]} - 방 정보 객체 배열
 *      - room_id {number} - 방 ID
 *      - title {string} - 방 제목
 *      - max_user_num {number} - 최대 사용자 수
 *      - current_user_num {number} - 현재 사용자 수
 *      - start_date {string} - 시작 날짜
 *      - week {number} - 총 주차 수
 *      - current_week {number} - 현재 주차
 *      - entry_fee {number} - 입장료
 *      - room_code {string} - 방 코드
 *      - account {string} - 계좌 정보
 *      - total_entry_fee {number} - 총 입장료
 *      - rule_id {number} - 규칙 ID
 *  */
export function useFetchRoomList() {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {roomList} = useSelector(({room}) => room);

    useEffect(() => {
        if (isFocused) {
            dispatch(fetchRooms());
        }
    }, [dispatch, isFocused]);

    return roomList;
}
export function useRoomLeader() {
    const {user, participants} = useSelector(({auth, room}) => ({user: auth.user, participants: room.participants}));

    const [isLeader, setIsLeader] = useState(false);
    useUpdateEffect(() => {
        /** 내가 현재 입장한 방의 방장이라면 true 리턴, 아니라면 false 리턴 **/
        participants.map((participant) => {
            if (participant.user_id === user.user_id) {
                setIsLeader(participant.authority);
            }
        });
    }, [user, participants]);

    return isLeader;
}

export function useFetchMyCurrentWeekDetailPlan(room_id) {

    /**
     *  세부 계획을 불러오기 위해서는 plan_id가 필요하다
     *  따라서 fetchPlan 후 얻어온 plan_id를 이용하여 fetchDetailPlan 을 수행한다.
     */
    const user = useSelector(({auth}) => auth.user);
    const isFocused = useIsFocused();
    const {roomInfo, participants} = useSelector(({room}) => room);
    const [detailPlans, setDetailPlans] = useState([]);

    useEffect(() => {
        if (isFocused) {
            /** 나의 participant_id 찾기 **/
            if (user != null && participants.length != 0 && roomInfo != null) {
                let myParticipantId = null;
                participants.forEach((participant) => {
                    if (participant.user_id === user.user_id) {
                        myParticipantId = participant.participant_id;
                    }
                });

                /** 나의 plan_id 불러오기 **/
                fetchPlan({participant_id: myParticipantId, week: roomInfo.current_week})
                    .then(({data: plan}) => {
                        /** 세부 계획 불러오기 **/
                        fetchDetailPlan(plan.plan_id)
                            .then(({data: detailPlans}) => {
                                setDetailPlans(detailPlans)
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    });

            }
        }

    }, [isFocused, roomInfo, participants]);

    return detailPlans;
}
