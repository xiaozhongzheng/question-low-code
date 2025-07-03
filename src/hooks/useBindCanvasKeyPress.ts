import { useDispatch } from "react-redux"
import { useKeyPress } from "ahooks"
import { nanoid } from "nanoid"
import {
    deleteComponentById,
    toPreComponent,
    toNextComponent,
    copySelectComponent,
    addComponents
} from '@/store/componentsReducer'
import { useGetComponentInfo } from "./useGetComponentInfo"
/** */
export const useBindCanvasKeyPress = () => {
    const { copyComponent } = useGetComponentInfo()

    const dispatch = useDispatch()

    // 删除组件
    useKeyPress(['backspace', 'delete'], () => {
        if (!isActiveElementValid()) return
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

}

// 判断鼠标的光标是否点击的是画布中的组件
function isActiveElementValid() {
    const activeEle = document.activeElement
    if (activeEle === document.body) return true
    return false
}