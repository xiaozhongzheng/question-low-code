import { useSelector } from "react-redux"
import { type StateType } from "@/store"
import { type ComponentsStateType } from "@/store/componentsReducer"
/**
 * 用于获取redux store中的组件配置信息，并在画布中展示
 * @returns 组件列表配置信息
 */
export const useGetComponentInfo = () => {
    const components = useSelector<StateType>(state => state.components) as ComponentsStateType
    const {componentList = [],selectedId = '',copyComponent = null} = components
    const selectComponent = componentList.find(c => c.fe_id === selectedId)
    return {
        componentList,
        selectedId,
        selectComponent,
        copyComponent
    }
}