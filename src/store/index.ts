import { configureStore } from "@reduxjs/toolkit";
import userReducer,{type UserStateType} from './userReducer';
import componentsReducer,{type ComponentsStateType} from './componentsReducer'
import pageInfoReducer,{type QuestionPageInfo} from './pageInfoReducer'
export type StateType = {
    user: UserStateType,
    components:ComponentsStateType,
    pageInfo: QuestionPageInfo
}
export default configureStore({
    reducer: {
        // 分模块
        user: userReducer,
        components: componentsReducer,
        pageInfo: pageInfoReducer
    }
})