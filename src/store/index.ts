import { configureStore } from "@reduxjs/toolkit";
import userReducer,{type UserStateType} from './userReducer';
import componetsReducer,{type ComponentsStateType} from './componentsReducer'
export type StateType = {
    user: UserStateType,
    components:ComponentsStateType
}
export default configureStore({
    reducer: {
        user: userReducer,
        components: componetsReducer
        // 分模块
    }
})