import type { QuestionPageInfo } from "@/components/Question";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const INIT_STATE: QuestionPageInfo = {
    title: '',
    desc: '',
    js: '',
    css: ''
}

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: INIT_STATE,
    reducers: {
        setPageInfo: (state: QuestionPageInfo,action: PayloadAction<QuestionPageInfo>) => {
            // state = action.payload 不行，原因：redux状态不可变
            return action.payload
        },
        changePageTitle: (state: QuestionPageInfo,action: PayloadAction<{title: string}>) => {
            state.title = action.payload.title
        }
    }
})

export const {setPageInfo,changePageTitle} = pageInfoSlice.actions

export default pageInfoSlice.reducer