import {
    Keyboard, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback, 
    View,
    TouchableOpacity,
} from "react-native";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import Logo from "../components/common/Logo";

function HomeScreen({route}) {

    // const {user, status} = useSelector(({auth}) => ({
    //     user: auth.user,
    //     status: auth.status.LOGIN,
    // }));

    /**
     * Props (to GET current room_id)
     * const room_id = route.params.room_id;
     */
    const room_id = 3;

    /** 
     * Dummy Data (GET rooms)
     * 1. 방 조회
    */
    const rooms = [
        {room_id: 1, title: '프론트 스터디'},
        {room_id: 2, title: '즐공'},
        {room_id: 3, title: '같공'},
        {room_id: 4, title: '열공'},
        {room_id: 5, title: '화이팅'},
    ];
    const my_room_list = [];
    for (let i = 0; i < 5; i++) {
        if(rooms[i] !== undefined) {
            if(rooms[i].room_id === room_id) { // current room
                my_room_list.push(
                    <View key={rooms[i].room_id} style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity style={styles.current_room} onPress={() => navigation.navigate('home', {room_id: rooms[i].room_id})}>
                            <Text style={styles.current_button_text}>{rooms[i].title}</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                    </View>
                );
            } else { // current room X
                my_room_list.push(
                    <View key={rooms[i].room_id} style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity style={styles.room} onPress={() => navigation.navigate('home', {room_id: rooms[i].room_id})}>
                            <Text style={styles.button_text}>{rooms[i].title}</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                    </View>
                );
            }
        }
        else {
            my_room_list.push(
                <View key={10000 + i} style={{flex: 1}}/>
            );
        }
    }

    /**
     * Dummy Data (GET Plan and Detail Plan)
     * 1. 주차 계획 조회
     * 2. 상세 계획 조회
     */
    const detail_plans = [
        {detail_plan_id: 1, content: 'UI/UX 디자인 방법들 연구', complete: false, plan_id: 1}, 
        {detail_plan_id: 2, content: '스터디 웹 서비스 UI/UX 디자인', complete: false, plan_id: 1}, 
        {detail_plan_id: 3, content: '새로운 개념의 SNS UI/UX 디자인', complete: false, plan_id: 1}, 
    ];
    const detail_plan_list = [];
    for(let i = 0; i < detail_plans.length; i++) {
        detail_plan_list.push(
            <View style={{flex: 1, key: detail_plans[i].detail_plan_id, justifyContent: 'center', marginLeft: '10%', marginRight: '10%', }}>
                <Text style={styles.detail_plan_text}>{detail_plans[i].content}</Text>
            </View>
        );
    }

    /**
     * Dummy Data (GET Participant)
     * 1. 방 조회
     * 2. 방 참여자 조회
     */
    const participants = [
        {participant_id: 1, user_id: 1, auth_id: 1, username: '준호', email: 'junho@gmail.com', profile: 'junho'},
        {participant_id: 2, user_id: 2, auth_id: 2, username: '진혁', email: 'jinhyeok@gmail.com', profile: 'jinhyeok'},
        {participant_id: 3, user_id: 3, auth_id: 3, username: '선형', email: 'sunhyeong@gmail.com', profile: 'sunhyeong'},
        {participant_id: 4, user_id: 4, auth_id: 4, username: '도연', email: 'doyeon@gmail.com', profile: 'doyeon'},
        {participant_id: 5, user_id: 5, auth_id: 5, username: '가현', email: 'gahyun@gmail.com', profile: 'gahyun'},
        {participant_id: 6, user_id: 6, auth_id: 6, username: '채리', email: 'chaeri@gmail.com', profile: 'chaeri'},
    ];
    const participant_list_top = [];
    for (let i = 0; i < 2; i++) {
        if(participants[i] !== undefined) {
            participant_list_top.push(
                <View key={participants[i].participant_id} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.user}>
                        <Text style={styles.button_text}>{participants[i].username}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>
            )
        }
        else {
            participant_list_top.push(
                <View key={10000 + i} style={{flex: 1}}/>
            );
        }
    }
    const participant_list_middle = [];
    for (let i = 2; i < 4; i++) {
        if(participants[i] !== undefined) {
            participant_list_middle.push(
                <View key={participants[i].participant_id} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.user}>
                        <Text style={styles.button_text}>{participants[i].username}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>
            )
        }
        else {
            participant_list_middle.push(
                <View key={10000 + i} style={{flex: 1}}/>
            );
        }
    }
    const participant_list_bottom = [];
    for (let i = 4; i < 6; i++) {
        if(participants[i] !== undefined) {
            participant_list_bottom.push(
                <View key={participants[i].participant_id} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.user}>
                        <Text style={styles.button_text}>{participants[i].username}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>
            )
        }
        else {
            participant_list_bottom.push(
                <View key={10000 + i} style={{flex: 1}}/>
            );
        }
    }
    

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}/>
            
            <View style={{flex: 1}}>
                <Logo/>
            </View>

            <View style={{flex: 0.1}}/>
            <View style={styles.myRoomContainer}>
                {my_room_list}
            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.1}}/>
            <View style={styles.topBar}>
                <View style={{flex: 1.5, backgroundColor: '#EDEDED', borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row'}}>
                    
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.main_text}>랭킹</Text></View>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.main_text}>룰</Text></View>
                    <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.main_text}>일정</Text></View>
                    <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}><Text style={styles.main_text}>환급 비용 계산</Text></View>

                </View>
                <View style={{flex: 1, flexDirection: 'row',}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 20}}>이번주 D - 5일</Text>
                    </View>
                    <View style={{flex: 0.01, backgroundColor: 'white'}}/>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 20}}>스터디 D- 4 주</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 0.1}}/>

            <View style={{flex: 0.25}}/>
            <View style={{flex: 4.75, width: '95%', alignSelf: 'center', flexDirection: 'row'}}>
                
                {/* 나의 이번주 계획 */}
                <View style={{flex: 1, backgroundColor: 'tomato', borderRadius: 20}}>
                    <View style={{flex: 1.5, backgroundColor: '#BFBFBF', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 15}}>나의 이번주 계획</Text>
                    </View>
                    <View style={{flex: 8.5, backgroundColor: '#EDEDED', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                        {detail_plan_list}
                    </View>
                </View>

                <View style={{flex: 0.05, backgroundColor: 'white'}}/>

                {/* 친구들과 나의 계획 */}
                <View style={{flex: 1, backgroundColor: 'tomato', borderRadius: 20}}>
                    <View style={{flex: 1.5, backgroundColor: '#BFBFBF', borderTopLeftRadius: 20, borderTopRightRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 15}}>친구들과 나의 계획</Text>
                    </View>
                    <View style={{flex: 8.5, backgroundColor: '#EDEDED', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {participant_list_top}
                        </View>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {participant_list_middle}
                        </View>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            {participant_list_bottom}
                        </View>
                        <View style={{flex: 0.1}}/>
                    </View>
                </View>
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
    myRoomContainer: {
        // flex: 1.0 - 0.1 - 0.1
        flex: 0.8,
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center',
    }, 
    topBar: {
        // flex: 1.5 - 0.1 - 0.1
        flex: 1.3,
        backgroundColor: '#000000',
        borderRadius: 20,
        width: '95%',
        alignSelf: 'center',
    },
    room: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center',
    },
    button_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
    },
    current_room: {
        flex: 8,
        backgroundColor: '#000000',
        width: '90%',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center',
    },
    current_button_text: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
    },
    main_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
    },
    detail_plan_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 17.5,
    },
    user: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        width: '90%',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center',
    },
});

export default HomeScreen;
