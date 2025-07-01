import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ComponentsPropsType } from "@/components/Question";

export type ComponentInfoType = {
    fe_id: string,
    type: string,
    title: string,
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
        // 默认内置了immer，所有可以直接修改state
        setComponents: (state: ComponentsStateType, action: PayloadAction<Array<ComponentInfoType>>) => {
            state.componentList = action.payload
        },
        setSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        addComponents: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const { componentList, selectedId } = state
            const index = componentList.findIndex(item => item.fe_id === selectedId)
            if (index < 0) {
                // 画布没有选中组件，则在末尾添加组件
                state.componentList.push(action.payload)
            } else {
                // 在选中组件的后一个位置插入组件
                state.componentList.splice(index + 1, 0, action.payload)
            }
            // 将插入的组件设置为选中状态
            state.selectedId = action.payload.fe_id
        },
        updateComponentProps: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentsPropsType }>) => {
            const { fe_id, newProps } = action.payload
            const component = state.componentList.find(c => c.fe_id === fe_id) as ComponentInfoType
            component.props = {
                ...component.props,
                ...newProps
            }
        }
    }
})

export const {
    setComponents,
    setSelectedId,
    addComponents,
    updateComponentProps
} = componentsSlice.actions

export default componentsSlice.reducer