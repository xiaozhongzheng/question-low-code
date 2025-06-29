import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { type ComponentsPropsType } from "@/components/Question";

export type ComponentInfoType = {
    fe_id: string,
    type: string,
    title:string,
    props: ComponentsPropsType
}

export type ComponentsStateType = {
    componentList: Array<ComponentInfoType>,
    selectedId: string
}
const INIT_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: ''
}
export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        setComponents: (state: ComponentsStateType,action: PayloadAction<ComponentsStateType>) => {
            return action.payload;
        },
        setSelectedId: (state: ComponentsStateType,action: PayloadAction<string>) => {
            state.selectedId = action.payload
        }
    }
})

export const {setComponents,setSelectedId} = componentsSlice.actions

export default componentsSlice.reducer