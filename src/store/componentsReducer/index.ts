import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ComponentsPropsType } from "@/components/Question";
import { getNextSelected } from './util';
import { message } from "antd";
import { cloneDeep } from "lodash";
// import {
//     arrayMove,
// } from '@dnd-kit/sortable';
import { myMoveArray } from "./util";
export type ComponentInfoType = {
    fe_id: string,
    type: string,
    title: string,
    isHidden: boolean,
    isLock: boolean,
    props: ComponentsPropsType
}

export type StateType = {
    componentList: Array<ComponentInfoType>, // 用于在画布中展示的组件列表
    selectedId: string,     // 当前选中组件的id
    copyComponent?: ComponentInfoType | null // 用于保存复制时的组件
}
export type ComponentsStateType = StateType & {
    snapshotData: StateType[], // 快照历史记录，用于撤销和重做
    snapshotIndex: number,  // 当前快照索引
    maxSnapshotCount: number // 最大快照数量
}
const INIT_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: '',
    copyComponent: null,
    snapshotData: [],
    snapshotIndex: -1,
    maxSnapshotCount: 20 // 默认保存20个 
}
// 记录快照
const recordSnapshot = (state: ComponentsStateType) => {
    const { componentList, snapshotData, maxSnapshotCount, selectedId, copyComponent, snapshotIndex } = state
    if(snapshotIndex !== snapshotData.length - 1){
        state.snapshotData = snapshotData.slice(0,snapshotIndex+1)
    }
    
    snapshotData.push({ componentList, selectedId, copyComponent })
    state.snapshotIndex++
    if (state.snapshotIndex > maxSnapshotCount) {
        // 保存的数据大于快照的数量，应该从头部删除一个数据
        snapshotData.shift()
        state.snapshotIndex--
    }
}
export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 默认内置了immer，所有可以直接修改state
        initData: (state: ComponentsStateType, action: PayloadAction<StateType>) => {
            const { componentList, selectedId } = action.payload
            state.componentList = componentList
            state.selectedId = selectedId
            recordSnapshot(state)
        },
        setComponents: (state: ComponentsStateType, action: PayloadAction<Array<ComponentInfoType>>) => {
            state.componentList = action.payload
        },
        // recordSnapshot: (state: ComponentsStateType) => {
        //     // 记录快照
        //     const { componentList, snapshotData, maxSnapshotCount, selectedId,copyComponent } = state
        //     snapshotData.push({ componentList, selectedId,copyComponent })
        //     state.snapshotIndex++
        //     if (state.snapshotIndex > maxSnapshotCount) {
        //         // 保存的数据大于快照的数量，应该从头部删除一个数据
        //         snapshotData.shift()
        //         state.snapshotIndex--
        //     }
        // },
        undo: (state: ComponentsStateType) => {
            const { snapshotIndex, snapshotData } = state  // 执行撤销操作
            if (snapshotIndex <= 0) return // 当快照只剩下一个元素
            return {
                ...state,
                snapshotIndex: snapshotIndex - 1,
                ...snapshotData[snapshotIndex - 1]
            }
        },
        redo: (state: ComponentsStateType) => { // 执行重做操作
            const { snapshotIndex, snapshotData } = state  // 执行撤销操作
            if (snapshotIndex >= snapshotData.length - 1) return
            return {
                ...state,
                snapshotIndex: snapshotIndex + 1,
                ...snapshotData[snapshotIndex + 1]
            }
        },
        setSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        addComponents: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const { componentList, selectedId } = state
            const index = componentList.findIndex(item => item.fe_id === selectedId)
            if (index < 0) {
                // 画布没有选中组件，则在末尾添加组件
                componentList.push(action.payload)
            } else {
                // 在选中组件的后一个位置插入组件
                componentList.splice(index + 1, 0, action.payload)
            }
            // 将插入的组件设置为选中状态
            state.selectedId = action.payload.fe_id
            recordSnapshot(state)

        },
        updateComponentProps: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentsPropsType }>) => {
            const { fe_id, newProps } = action.payload
            const component = state.componentList.find(c => c.fe_id === fe_id) as ComponentInfoType
            component.props = {
                ...component.props,
                ...newProps
            }
            recordSnapshot(state)
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
            recordSnapshot(state)
        },
        changeComponentHidden: (state: ComponentsStateType, action: PayloadAction<{ isHidden: boolean, selectId?: string }>) => {
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
        changeComponentLock: (state: ComponentsStateType, action: PayloadAction<{ selectId?: string }>) => {
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
        },
        changeComponentPosition: (state: ComponentsStateType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
            const { componentList } = state
            const { oldIndex, newIndex } = action.payload
            state.componentList = myMoveArray(componentList, oldIndex, newIndex)
        }
    }
})

export const {
    initData,
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
    changeComponentTitle,
    changeComponentPosition,
    // recordSnapshot,
    undo,
    redo
} = componentsSlice.actions

export default componentsSlice.reducer