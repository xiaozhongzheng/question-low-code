import { useDispatch } from "react-redux"
import { useKeyPress } from "ahooks"
import { nanoid } from "nanoid"
import {
    deleteComponentById,
    toPreComponent,
    toNextComponent,
    copySelectComponent,
    addComponents,
    undo,
    redo
} from '@/store/componentsReducer'
import { useGetComponentInfo } from "./useGetComponentInfo"
/** */
export const useBindCanvasKeyPress = () => {

    const { copyComponent } = useGetComponentInfo()

    const dispatch = useDispatch()

    // 删除组件
    useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return null

        dispatch(deleteComponentById())
    })

    // 复制组件
    useKeyPress(['ctrl.c'], () => {
        dispatch(copySelectComponent())
    })

    // 粘贴组件
    useKeyPress(['ctrl.v'], () => {
        if (copyComponent) {
            dispatch(addComponents({ ...copyComponent, fe_id: nanoid() }))
        }
    })

    // 选中上一个组件
    useKeyPress(['uparrow'], () => {
        dispatch(toPreComponent())
    })

    // 选中下一个组件
    useKeyPress(['downarrow'], () => {
        dispatch(toNextComponent())
    })

    // 撤回
    useKeyPress(['ctrl.z'],() =>{
        dispatch(undo())
    })

    // 重做
    useKeyPress(['ctrl.shift.z'],() =>{
        dispatch(redo())
    })
}

// 判断鼠标的光标是否点击的是画布中的组件
function isActiveElementValid() {
    const activeEle = document.activeElement
    console.log(activeEle,'activeEle')
    // 假如拖拽排序之前
    if (activeEle === document.body) return true
    // 加了拖拽排序后
    if(activeEle?.matches('div[role="button"]')) return  true
    return false
}