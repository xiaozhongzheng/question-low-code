import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PageInfoStateType = {
    title: string;
    desc?: string;
    js?: string;
    css?: string;
}

const INIT_STATE: PageInfoStateType = {
    title: '',
    desc: '',
    js: '',
    css: ''
}

const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState: INIT_STATE,
    reducers: {
        setPageInfo: (state: PageInfoStateType,action: PayloadAction<PageInfoStateType>) => {
            // state = action.payload 不行，原因：redux状态不可变
            return action.payload
        }
    }
})

export const {setPageInfo} = pageInfoSlice.actions

export default pageInfoSlice.reducer