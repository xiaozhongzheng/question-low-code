import { createSlice, type PayloadAction } from "@reduxjs/toolkit"; 


export type UserStateType = {
    username: string,
    nickname: string
}

const INIT_STATE: UserStateType = {username: '',nickname: ''}

export const userSlice = createSlice({
    name: 'user',
    initialState: INIT_STATE,
    reducers: {
        loginReducers: (state: UserStateType,action: PayloadAction<UserStateType>) => {
            return  action.payload;
        },
        logoutReducers: () => INIT_STATE
    }
})

export const {loginReducers,logoutReducers} = userSlice.actions

export default userSlice.reducer