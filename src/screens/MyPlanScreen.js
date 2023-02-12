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

/**
 * To. 용운,
 * Dummy Data에서 auth_id, participant_id, current_week, week 변경하면서 테스트 해주라
 * 나름 신경쓰면서 하긴 했어! 
 * 경우1. (auth_id === participant_id / participant_id !== participant_id)
 * 경우2. (current_week === plans.week / current_week !== plans.week)
 */
export default function PlanScreen() {
    /**
     * Dummy Data (By Redux)
     */
    const auth_id = 1; // By Redux store (Current User)
    const auth_name = '준호'; // By Redux store (Current User)

    /**
     * Dummy Data (By Props)
     */
    const total_week = 8; // By GET 방 단일 조회 과정 /rooms/{room_id}
    const current_week = 4; // By (현재 시간) - (방 start_date) 계산
    const participant_id = 1; // By GET 방 참여자 조회 /participants/{room_id}?accepted={}
    const participant_name = '준호';

    /**
     * Required variable
     */
    const [clickedWeek, setClickedWeek] = useState(current_week); // 현재 클릭한 week

    /**
     * Dummy Data (to GET /plans/{participant_id}?week={})
     */
    const plans = {
        plan_id: 1,
        start_date: '2023-01-01',
        target_date: '2023-01-08',
        score: 1.5,
        week: 4,
        three_day_passed: false,
        rejected: false,
        user_id: 1,
        room_id: 1
    };

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

    const weeks = [];
    for(let i = 1; i <= total_week; i++) {
        if(i === clickedWeek) {
            weeks.push(
                <TouchableOpacity key={i} style={styles.current_week} onPress={() => setClickedWeek(i)}>
                    <Text style={styles.current_week_text}>{i}주차</Text>
                </TouchableOpacity>
            )
        } // Clicked
        else {
            weeks.push(
                <TouchableOpacity key={i} style={styles.non_current_week}onPress={() => setClickedWeek(i)}>
                    <Text style={styles.non_current_week_text}>{i}주차</Text>
                </TouchableOpacity>
            )
        } // Unclicked
    }

    const detailPlans = [];
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
    }
    if (auth_id === participant_id && !plans.three_day_passed && plans.week === current_week) {
        detailPlans.push(
            <TouchableOpacity key={10000} style={styles.add_plan}>
                <Text style={styles.detail_plan_text}>추가하기</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container} >
            
            {/* Logo */}
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1}}>
                <Logo />
            </View>
            <View style={{flex: 0.1}}/>
            
            {/* Weeks */}
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 0.5}}/>
                <View style={styles.user_container}>
                    <Text style={styles.user_name_text}>{participant_name}</Text>
                </View>
                <View style={styles.week_container}>
                    <ScrollView horizontal={true} style={{flex: 1}}>
                        {weeks}
                    </ScrollView>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
            <View style={{flex: 0.1}}/>

            {/* Detail Plans */}
            <View style={styles.detail_plans_cotainer}>
                <ScrollView style={{flex: 1,}}>
                    {detailPlans}
                </ScrollView>
            </View>
            <View style={{flex: 0.1}}/>
            
            {/* Other's Dislike */}
            <View style={{flex: 1, flexDirection: 'row',}}>
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
                {auth_id !== participant_id && !plans.three_day_passed && plans.week === current_week ?
                    <View style={styles.dislike_button}>
                        <TouchableOpacity>
                            <Icon name="thumbs-down" color="white" size={hp(6)}/>
                        </TouchableOpacity>
                    </View>
                :
                    <View/>
                }
            </View>
            <View style={{flex: 0.5}} />

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