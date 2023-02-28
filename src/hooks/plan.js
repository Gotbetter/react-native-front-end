import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPlanAndDetailPlan} from "../module/room";


export function useWeekSelector() {

    const {roomInfo} = useSelector(({room}) => room);
    const [weekList, setWeekList] = useState([]);
    const [clickedWeek, setClickedWeek] = useState(1); // 현재 클릭한 week


    useEffect(() => {
        /** 전체 주차 설정 **/
        let next = [];
        for (let i = 1; i <= roomInfo.week; ++i) {
            next.push(i);
        }
        setWeekList(next);

        /** 현재 클릭한 주차 설정 **/
        setClickedWeek(roomInfo.current_week);

    }, []);

    /**
     * weekList: WeekList 컴포넌트에서 (x주차)를 생성할때 필요한 배열
     * clickedWeek: 현재 클릭한 주차
     * setClickedWeek: clickedWeek setter
     */
    return [weekList, clickedWeek, setClickedWeek];

}

export function usePlanner(planner) {

    const {user} = useSelector(({auth}) => auth);
    const [isMyPlan, setIsMyPlan] = useState(null);

    useEffect(() => {
        /** 현재 계획이 자신이 세운 계획인지 확인 **/
        setIsMyPlan((user.user_id === planner.user_id));

    }, [planner]);


    return isMyPlan;
}


export function useFetchPlanAndDetailPlans(participant_id, clickedWeek) {

    const dispatch = useDispatch();

    const {plan, detailPlans, planDislikeInfo} = useSelector(({room}) => room);

    useEffect(() => {
        dispatch(fetchPlanAndDetailPlan({participant_id, week: clickedWeek}));
    }, [dispatch, participant_id, clickedWeek]);

    /**
     * plans: 현재 계획에 대한 전반적 정보
     * planDislikeInfo: 계획에 대한 싫어요 수, 체크 유무
     * detailPlans: 세부 계획
     */
    return [plan, planDislikeInfo, detailPlans];

}
