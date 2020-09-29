import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/types'

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER:
            //리턴값은 리덕스 스토어로 들어감 (dispatch된 action type에 의하여 reducer는 store를 변경시켜 줌)
            return {...state, loginSuccess: action.payload} //...은 인자로 받은 state을 그대로 가져옴
        case REGISTER_USER:
            return {...state, register: action.payload}
        case AUTH_USER:
            return {...state, userData: action.payload}
        case LOGOUT_USER:
            return {...state}
        default:
            return state;
    }
}