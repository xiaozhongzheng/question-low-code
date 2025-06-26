import { configureStore } from "@reduxjs/toolkit";
import userReducer,{type UserStateType} from './userReducer';
export type StateType = {
    user: UserStateType
}
export default configureStore({
    reducer: {
        user: userReducer
        // 分模块
    }
})