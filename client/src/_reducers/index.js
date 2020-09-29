import {combineReducers} from 'redux';
import user from './user_reducer';  //user_reducer.js 파일에서 명칭 없이 export default를 했기 때문에 아무거나 원하는 이름으로 import

const rootReducer = combineReducers({
    user
})

export default rootReducer