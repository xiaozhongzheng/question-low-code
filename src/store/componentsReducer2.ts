import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ComponentInfoType, type ComponentsPropsType } from "@/components/Question";
import { getNextSelected, myMoveArray } from './componentsReducer/util';
import { message } from "antd";
import { cloneDeep } from "lodash";
// import {
//     arrayMove,
// } from '@dnd-kit/sortable';
// export type ComponentInfoType = {
//     fe_id: string,
//     type: string,
//     title: string,
//     isHidden: boolean,
//     isLock: boolean,
//     props: ComponentsPropsType
// }

export type CanvaStateType = {
    componentList: Array<ComponentInfoType>, // 用于在画布中展示的组件列表
    selectedId: string,     // 当前选中组件的id
    copyComponent?: ComponentInfoType | null // 用于保存复制时的组件
}

type OperationType = 'add' | 'delete' | 'update'

type OperationRecord = {
    type: OperationType; // 操作类型
    source?: CanvaStateType;  // 操作前的状态/来源组件
    target?: CanvaStateType;  // 操作后的状态/目标组件
    changeIndex?: number;
}

export type ComponentsStateType = CanvaStateType & {
    operationStack: OperationRecord[];
    currentIndex: number; // 当前操作位置的索引
    maxCount: number;
}

const INIT_STATE: ComponentsStateType = {
    componentList: [],
    selectedId: '',
    copyComponent: null,
    operationStack: [],
    currentIndex: -1, // 初始化为-1
    maxCount: 20
}
const recordSnapshot = (state: ComponentsStateType, operation: OperationRecord) => {
    const { operationStack, currentIndex, maxCount } = state;

    // 如果当前不是最新操作，截断后面的操作
    if (currentIndex < operationStack.length - 1) {
        state.operationStack = operationStack.slice(0, currentIndex + 1);
    }

    operationStack.push(operation);
    state.currentIndex = operationStack.length - 1;

    // 限制历史记录数量
    if (operationStack.length > maxCount) {
        operationStack.shift();
        state.currentIndex--;
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
            // recordSnapshot(state, { type: 'init', lastId: selectedId, changeIndex: -1 });
        },
        resetData: () => {
            return { ...INIT_STATE }
        },
        setComponents: (state: ComponentsStateType, action: PayloadAction<Array<ComponentInfoType>>) => {
            state.componentList = action.payload
        },
        undo: (state: ComponentsStateType) => {
            if (state.currentIndex < 0) return;

            const operation = state.operationStack[state.currentIndex];
            const { type, source, target, changeIndex } = operation;
            const {component,selectedId} = source
            switch (type) {
                case 'add':
                    state.componentList.splice(changeIndex!, 1);
                    break;
                case 'delete':
                    state.componentList.splice(changeIndex!, 0, component);
                    break;
                case 'update':
                    state.componentList[changeIndex!] = component;
            }

            state.selectedId = selectedId|| '';
            state.currentIndex--;
        },

        redo: (state: ComponentsStateType) => {
            if (state.currentIndex >= state.operationStack.length - 1) return;

            state.currentIndex++;
            const operation = state.operationStack[state.currentIndex];
            const { type, source, target, changeIndex } = operation;

            switch (type) {
                case 'add':
                    state.componentList.splice(changeIndex!, 0, target!.component!);
                    break;
                case 'delete':
                    state.componentList.splice(changeIndex!, 1);
                    break;
                case 'update':
                    state.componentList[changeIndex!] = target!.component!;
            }

            state.selectedId = target?.id || '';
        }
        setSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            state.selectedId = action.payload
        },
        addComponents: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const { componentList, selectedId, } = state
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
                nextId: component.fe_id,
                componentData: component,
                changeIndex: componentList.findIndex(c => c.fe_id === component.fe_id)
            }
            recordSnapshot(state, operation)
        },
        updateComponentProps: (state: ComponentsStateType, action: PayloadAction<{ fe_id: string, newProps: ComponentsPropsType }>) => {
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
            recordSnapshot(state, operation)
        },
        deleteComponentById: (state: ComponentsStateType) => {
            const { componentList, selectedId, } = state
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
    resetData,
    undo,
    redo
} = componentsSlice.actions

export default componentsSlice.reducer