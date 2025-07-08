import {type ComponentInfoType} from './index'

export const getNextSelected = (selected: string,componentList: ComponentInfoType[]) => {
    let len = componentList.length
    if(len <= 1){
        // 没有组件或者只有一个组件时，返回''
        return ''
    }
    const index = componentList.findIndex(c => c.fe_id === selected)
    if(len === index + 1){
        // 删除的是最后一个组件，返回上一个组件的id
        return componentList[index - 1].fe_id
    }
    // 删除中间的组件，返回下一个组件的id
    return componentList[index + 1].fe_id
}

/**
 * 将某个数组的startIndex位置上的元素移动到endIndex位置上去
 * @param arr 
 * @param startIndex 
 * @param endIndex 
 * @returns 
 */
export const myMoveArray = (arr: Array<any>,startIndex: number,endIndex: number) => {
    const newArr = arr.map(item => item) // 返回一个新数组
    newArr.splice(startIndex,1) // 删除startIndex处的元素
    newArr.splice(endIndex,0,arr[startIndex]) // 在endIndex处插入被删除的元素
    return newArr
}