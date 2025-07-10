import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ComponentsPropsType } from "@/components/Question";
import { getNextSelected, myMoveArray } from './componentsReducer/util';
import { message } from "antd";
import { cloneDeep } from "lodash";
// import {
//     arrayMove,
// } from '@dnd-kit/sortable';
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

type OperationType = 'add' | 'delete' | 'update' | 'init'

type OperationRecord = {
    // type 表示增删改的类型
    type: OperationType;
    // lastId、nextId 用于记录当前选中组件的id的变化
    lastId?: string;
    nextId?: string;
    preComponentData?: ComponentInfoType; // 保存上一个组件，用于 update 操作
    componentData?: ComponentInfoType; // 保存当前组件
    changeIndex?: number // 表示当前操作的组件列表的索引
}

export type ComponentsStateType = StateType & {
    operationStack: OperationRecord[];
    redoStack: OperationRecord[];
    maxCount: number;
}
const INIT_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: '',
    copyComponent: null,
    operationStack: [],
    redoStack: [],
    maxCount: 20 // 默认保存20个 
}

const recordSnapshot = (state: ComponentsStateType, operation: OperationRecord) => {
    const { operationStack,maxCount } = state
    operationStack.push(operation)
    if (operationStack.length > maxCount + 1) {
        // 保存的数据大于快照的数量，应该从头部删除一个数据
        operationStack.shift()
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
            recordSnapshot(state, { type: 'init', lastId: selectedId, changeIndex: -1 })
        },
        setComponents: (state: ComponentsStateType, action: PayloadAction<Array<ComponentInfoType>>) => {
            state.componentList = action.payload
        },
        undo: (state: ComponentsStateType) => {
            const { operationStack, componentList, redoStack, selectedId } = state
            if (operationStack.length <= 1) return // 默认只有一条数据时，是初始化数据，不可撤回
            const operation = operationStack.pop() as OperationRecord
            const { type, lastId = '', componentData, changeIndex = -1, preComponentData } = operation
            switch (type) {
                case 'add':
                    componentList.splice(changeIndex, 1)
                    break
                case 'delete':
                    componentList.splice(changeIndex, 0, componentData as ComponentInfoType)
                    break
                case 'update':
                    componentList[changeIndex] = preComponentData as ComponentInfoType
            }
            state.selectedId = lastId
            redoStack.push({ ...operation, nextId: selectedId })
        },
        redo: (state: ComponentsStateType) => { // 执行重做操作
            const { redoStack, componentList, operationStack, selectedId } = state
            if (redoStack.length === 0) return
            const operation = redoStack.pop() as OperationRecord
            const { type, componentData, nextId = '', changeIndex = -1 } = operation
            switch (type) {
                case 'add':
                    componentList.splice(changeIndex, 0, componentData as ComponentInfoType)
                    break
                case 'delete':
                    componentList.splice(changeIndex, 1)
                    break
                case 'update':
                    componentList[changeIndex] = componentData as ComponentInfoType
            }
            state.selectedId = nextId
            operationStack.push({ ...operation, lastId: selectedId })
        },
        setSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        addComponents: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const { componentList, selectedId,redoStack } = state
            const component = action.payload
            const index = componentList.findIndex(item => item.fe_id === selectedId)
            if (index < 0) {
                // 画布没有选中组件，则在末尾添加组件
                componentList.push(component)
            } else {
                // 在选中组件的后一个位置插入组件
                componentList.splice(index + 1, 0, component)
            }
            // 将插入的组件设置为选中状态
            state.selectedId = component.fe_id
            // recordSnapshot(state)
            const operation: OperationRecord = {
                type: 'add',
                lastId: selectedId,
                componentData: component,
                changeIndex: componentList.findIndex(c => c.fe_id === component.fe_id)
            }
            redoStack.length && (state.redoStack = [])
            recordSnapshot(state, operation)
        },
        updateComponentProps: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentsPropsType }>) => {
            const {redoStack} = state
            const { fe_id, newProps } = action.payload
            const component = state.componentList.find(c => c.fe_id === fe_id) as ComponentInfoType
            const preComponentData = cloneDeep(component)
            component.props = {
                ...component.props,
                ...newProps
            }
            const operation: OperationRecord = {
                type: 'update',
                preComponentData,
                componentData: component,
                changeIndex: state.componentList.findIndex(c => c.fe_id === fe_id),
                lastId: fe_id,
                nextId: fe_id
            }
            redoStack.length && (state.redoStack = [])
            recordSnapshot(state, operation)
        },
        deleteComponentById: (state: ComponentsStateType) => {
            const { componentList, selectedId,redoStack } = state
            if (!selectedId) {
                message.warning('请先选择组件！')
                return
            }
            const newSelected = getNextSelected(selectedId, componentList)
            console.log(newSelected, 'newSelected')
            state.selectedId = newSelected
            const index = componentList.findIndex(c => c.fe_id === selectedId)
            const componentData = componentList[index]
            componentList.splice(index, 1)
            const operation: OperationRecord = {
                type: 'delete',
                componentData,
                lastId: selectedId,
                nextId: newSelected,
                changeIndex: index
            }
            redoStack.length && (state.redoStack = [])
            recordSnapshot(state, operation)
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
    undo,
    redo
} = componentsSlice.actions

export default componentsSlice.reducer