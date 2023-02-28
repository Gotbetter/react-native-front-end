import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchRoom, fetchRooms} from "../module/room";
import {useIsFocused} from "@react-navigation/native";
import useUpdateEffect from "./common";
import {fetchDetailPlan, fetchPlan} from "../lib/plans";


export const useFetchRoom = () => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {roomList, loading} = useSelector(({auth, room}) => ({
        roomList: room.roomList,
    }));

    useEffect(() => {
        if (isFocused == true) {
            dispatch(fetchRooms());
        }
    }, [dispatch, isFocused]);


    return [roomList, loading];
}

export function useFetchRoomInfo(room_id) {

    const dispatch = useDispatch();
    const {roomInfo} = useSelector(({room}) => room);

    useEffect(() => {
        /** 현재 방 정보 불러오기 **/
        dispatch(fetchRoom({room_id}));
    }, [dispatch, room_id]);

    return roomInfo;

}

export function useFetchRoomList() {
    const dispatch = useDispatch();
    const {roomList} = useSelector(({room}) => room);

    useEffect(() => {
        /** 내가 생성한 방 리스트 불러오기 **/
        dispatch(fetchRooms());
    }, [dispatch]);

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

export function useGetDayInfo() {

    /**
     *  curWeekLeftDay : 이번주 몇 일 남았는지
     *  studyWeekLeft : 스터디 방 종료까지 몇 주 남았는지
     */
    const [curWeekLeftDay, setCurWeekLeftDay] = useState(0);
    const [studyWeekLeft, setStudyWeekLeft] = useState(0)

    const {roomInfo} = useSelector(({room}) => room);

    useEffect(() => {
        if (roomInfo != null) {
            const {week, current_week} = roomInfo;
            const thisDate = new Date();
            setCurWeekLeftDay(7 - thisDate.getDay());
            setStudyWeekLeft(week - current_week);
        }
    }, [roomInfo]);

    return [curWeekLeftDay, studyWeekLeft];
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

    }, [isFocused,roomInfo, participants]);

    return detailPlans;
}
