import {
    Keyboard,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    HorizontalScrollView,
    TouchableOpacity,
    LinearLayout,
} from "react-native";

import {
    useState,
    useEffect,
} from "react";

import Icon from 'react-native-vector-icons/Entypo';
import CheckIcon from 'react-native-vector-icons/Fontisto';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Logo from "../components/common/Logo";
import {useRoute} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {fetchPlans} from "../module/plans";

/**
 * To. 용운,
 * Dummy Data에서 auth_id, participant_id, current_week, week 변경하면서 테스트 해주라
 * 나름 신경쓰면서 하긴 했어!
 * 경우1. (auth_id === participant_id / participant_id !== participant_id)
 * 경우2. (current_week === plans.week / current_week !== plans.week)
 */
export default function PlanScreen() {

    const dispatch = useDispatch();
    const {params: {participant_id, planned_name}} = useRoute();


    const [totalWeek, setTotalWeek] = useState([]);
    const [curWeek, setCurWeek] = useState(1);
    const [clickedWeek, setClickedWeek] = useState(1); // 현재 클릭한 week


    const {user, plans, room} = useSelector(({auth, plans, room}) => ({
        user: auth.user,
        plans: plans.plans,
        room: room.room,
    }));

    useEffect(() => {
        if (room != null) {
            /** 전체 주차 설정 **/
            let next = [];
            for (let i = 1; i <= room.week; ++i) {
                next.push(i);
            }
            setTotalWeek(next);

            /** 현재 주차 설정 **/
            setCurWeek(room.current_week);
        }
    }, [room]);

    useEffect(() => {
        /** 클릭한 주차에 해당하는 plan 불러오기 **/
        dispatch(fetchPlans({participant_id, week: clickedWeek}));

    }, [dispatch, participant_id, clickedWeek]);


    /**
     * Dummy Data (to GET /plans/{plan_id}/details)
     */
    const detail_plans = [
        {
            detail_plan_id: 1,
            content: 'UI/UX 디자인 방법들 연구',
            complete: true,
            plan_id: 1,
        },
        {
            detail_plan_id: 2,
            content: '스터디 웹 서비스 UI/UX 디자인',
            complete: true,
            plan_id: 1,
        },
        {
            detail_plan_id: 3,
            content: '새로운 개념의 SNS UI/UX 디자인',
            complete: false,
            plan_id: 1,
        }
    ]

    /**
     * Dummy Data (to GET /plans/{plan_id}/dislike)
     */
    const dislike_count = 2;
    const checked = false;


    /*const detailPlans = [];
    for(let i = 0; i < detail_plans.length; i++) {
        detailPlans.push(
            <View key={detail_plans[i].detail_plan_id} style={styles.detail_plan}>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    {detail_plans[i].complete ?
                        auth_id === participant_id && plans.week === current_week ?
                        <TouchableOpacity>
                            <CheckIcon name="checkbox-active" size={wp(5)}/>
                        </TouchableOpacity>
                        :
                        <View>
                            <CheckIcon name="checkbox-active" size={wp(5)}/>
                        </View>
                    :
                        auth_id === participant_id && plans.week === current_week ?
                        <TouchableOpacity>
                            <CheckIcon name="checkbox-passive" size={wp(5)}/>
                        </TouchableOpacity>
                        :
                        <View>
                            <CheckIcon name="checkbox-passive" size={wp(5)}/>
                        </View>
                    }
                </View>
                <View style={{flex: 6}}>
                    <Text style={styles.detail_plan_text}>{detail_plans[i].content}</Text>
                </View>
                {plans.week === current_week ?
                    auth_id === participant_id ?
                        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{justifyContent: 'center'}}>
                                <TouchableOpacity>
                                    <View style={styles.fix_button}>
                                        <Text>수정</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{height: hp(1)}}/>
                                <TouchableOpacity>
                                    <View style={styles.add_file_button}>
                                        <Text>파일 첨부</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    :
                        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={styles.detail_dislike_button}>
                                <TouchableOpacity>
                                    <Icon name="thumbs-down" color="#BFBFBF" size={hp(4)}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                :
                    <View/>
                }
            </View>
        );
    }*/


    return (
        <View style={styles.container}>

            <View style={{flex: 0.5}}/>
            <View style={{flex: 1}}>
                <Logo/>
            </View>
            <View style={{flex: 0.1}}/>

            {/* 주별로 선택 */}
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.5}}/>
                <View style={styles.user_container}>
                    <Text style={styles.user_name_text}>{planned_name}</Text>
                </View>
                <View style={styles.week_container}>
                    <ScrollView horizontal={true} style={{flex: 1}}>
                        {
                            totalWeek && (
                                totalWeek.map((week) => (
                                    <TouchableOpacity key={week}
                                                      style={curWeek === week ? styles.current_week : styles.non_current_week}
                                                      onPress={() => setClickedWeek(week)}>
                                        <Text style={curWeek === week ? styles.current_week_text : styles.week_text}>
                                            {week}주차
                                        </Text>
                                    </TouchableOpacity>
                                )))
                        }
                    </ScrollView>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
            <View style={{flex: 0.1}}/>

            {/*Detail Plans*/}
            <View style={styles.detail_plans_cotainer}>
                <ScrollView style={{flex: 1,}}>
                    {
                        plans && plans.three_days_passed === false ? (
                            <TouchableOpacity key={10000} style={styles.add_plan}>
                                <Text style={styles.detail_plan_text}>추가하기</Text>
                            </TouchableOpacity>
                        ) : null
                    }
                </ScrollView>
            </View>
            <View style={{flex: 0.1}}/>

            {/*Other's Dislike*/}
            <View style={{flex: 1, flexDirection: 'row',}}>
                {
                    user.username === planned_name ?
                        (
                            <View style={styles.dislike_container}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.dislike_text}>친구들의 평가</Text>
                                </View>
                                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon name="thumbs-down" size={hp(6)}/>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.dislike_text}>{dislike_count}</Text>
                                </View>
                            </View>
                        ) :
                        (
                            <View style={styles.dislike_button}>
                                <TouchableOpacity>
                                    <Icon name="thumbs-down" color="white" size={hp(6)}/>
                                </TouchableOpacity>
                            </View>
                        )
                }
            </View>
            <View style={{flex: 0.5}}/>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    user_container: {
        flex: 2,
        backgroundColor: '#DFDFDF',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_name_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
    },
    week_container: {
        flex: 7,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    non_current_week: {
        width: hp(8),
        height: hp(8),
        marginLeft: wp(1),
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#BFBFBF',
    },
    current_week_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 15,
    },
    current_week: {
        width: hp(8),
        height: hp(8),
        marginLeft: wp(1),
        borderRadius: 30,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#BFBFBF',
    },
    week_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 15,
    },

    detail_plans_cotainer: {
        flex: 5.7,
        backgroundColor: '#FFFFFF',
        marginLeft: wp(5),
        marginRight: wp(5),
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#DFDFDF',
    },
    detail_plan: {
        flex: 1,
        width: wp(80),
        height: hp(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: hp(1),
        flexDirection: 'row',
    },
    detail_plan_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 15,
    },
    fix_button: {
        backgroundColor: '#DFDFDF',
        width: wp(12),
        height: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    },
    add_file_button: {
        backgroundColor: '#DFDFDF',
        width: wp(15),
        height: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    },
    detail_dislike_button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    add_plan: {
        flex: 1,
        width: wp(80),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: hp(1),
        flexDirection: 'row',
        backgroundColor: '#DFDFDF'
    },

    dislike_container: {
        flex: 1,
        backgroundColor: '#DFDFDF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(5),
        marginRight: wp(5),

        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
    },
    dislike_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 12,
    },
    dislike_button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(5),
        marginRight: wp(5),
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        backgroundColor: '#000000',
    },
});
