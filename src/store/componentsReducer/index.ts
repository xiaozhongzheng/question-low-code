import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ComponentsPropsType } from "@/components/Question";
import { getNextSelected } from './util';
import { cloneDeep } from 'lodash'
import { message } from "antd";
export type ComponentInfoType = {
    fe_id: string,
    type: string,
    title: string,
    isHidden: boolean,
    isLock: boolean,
    props: ComponentsPropsType
}

export type ComponentsStateType = {
    componentList: Array<ComponentInfoType>,
    selectedId: string,
    copyComponent: ComponentInfoType | null
}
const INIT_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: '',
    copyComponent: null
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
        },
        deleteComponentById: (state: ComponentsStateType) => {
            const { componentList, selectedId } = state
            if (!selectedId) {
                message.warning('请先选择组件！')
                return
            }
            const newSelected = getNextSelected(selectedId, componentList)
            console.log(newSelected, 'newSelected')
            state.selectedId = newSelected
            const index = componentList.findIndex(c => c.fe_id === selectedId)
            console.log(index, 'index')
            componentList.splice(index, 1)
        },
        changeComponentHidden: (state: ComponentsStateType, action: PayloadAction<{ isHidden: boolean, selectId: string }>) => {
            let newId = action.payload?.selectId || state.selectedId
            const { componentList } = state
            if (!newId) {
                message.warning('请先选择组件！')
                return
            }
            const { isHidden } = action.payload
            const component = componentList.find(c => c.fe_id === newId)
            if (!component) return
            if (isHidden) {
                // 隐藏组件
                const newSelected = getNextSelected(newId, componentList.filter(c => !c.isHidden))
                state.selectedId = newSelected
                component.isLock = false
            } else {
                // 显示组件
                state.selectedId = newId
            }

            component.isHidden = isHidden

        },
        changeComponentLock: (state: ComponentsStateType, action: PayloadAction<{ selectId: string }>) => {
            let newId = action.payload?.selectId || state.selectedId
            const { componentList } = state
            if (!newId) {
                message.warning('请先选择组件！')
                return
            }
            const component = componentList.find(c => c.fe_id === newId)
            if (!component) return
            if (component.isHidden) {
                message.info('隐藏的组件不能被锁定~') // 隐藏的组件不触发lock
                return
            }
            component.isLock = !component.isLock
        },
        copySelectComponent: (state: ComponentsStateType) => {
            const { componentList, selectedId } = state
            if (!selectedId) {
                message.warning('请先选择组件！')
                return
            }
            const component = componentList.find(c => c.fe_id === selectedId)
            if (!component) return
            state.copyComponent = { ...cloneDeep(component) }
        },
        toPreComponent: (state: ComponentsStateType) => {
            const { componentList, selectedId } = state
            const index = componentList.findIndex(c => c.fe_id === selectedId)
            if (index <= 0) return // 未选择组件或者当前组件在第一个时，不做任何处理
            state.selectedId = componentList[index - 1].fe_id
        },
        toNextComponent: (state: ComponentsStateType) => {
            const { componentList, selectedId } = state
            const index = componentList.findIndex(c => c.fe_id === selectedId)
            if (index < 0 || index === componentList.length - 1) return // 未选择组件或者当前组件在最后一个时，不做任何处理
            state.selectedId = componentList[index + 1].fe_id
        },
        changeComponentTitle: (state: ComponentsStateType, action: PayloadAction<{ value: string }>) => {
            const { selectedId, componentList } = state
            const { value } = action.payload
            const component = componentList.find(c => c.fe_id === selectedId)
            if (!component) return
            component.title = value
        }
    }
})

export const {
    setComponents,
    setSelectedId,
    addComponents,
    updateComponentProps,
    deleteComponentById,
    changeComponentHidden,
    changeComponentLock,
    copySelectComponent,
    toPreComponent,
    toNextComponent,
    changeComponentTitle
} = componentsSlice.actions

export default componentsSlice.reducer