import React, { type FC } from 'react'
import styles from './index.module.scss';
import { getComponentConfigByType } from '@/components/Question';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { setSelectedId, changeComponentPosition, type ComponentInfoType } from '@/store/componentsReducer';
import { useDispatch } from 'react-redux';
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress';
import { Empty } from 'antd';
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
const Canvas: FC = () => {
    // console.log(componentConfigList,'componentConfigList')
    const dispatch = useDispatch()
    const { componentList, selectedId = '' } = useGetComponentInfo()
    const getComponent = (componentInfo: ComponentInfoType) => {
        const { type, props } = componentInfo
        const componentConfig = getComponentConfigByType(type)
        const { Component } = componentConfig || {}
        if (!Component) return null
        return <Component {...props} />
    }
    const handleClick = (e: MouseEvent, id: string) => {
        e.stopPropagation() // 阻止冒泡事件
        dispatch(setSelectedId(id))
    }

    useBindCanvasKeyPress()  // 监听键盘事件
    const handleDragEnd = (oldIndex: number, newIndex: number) => {
        // 修改redux store中组件数组中元素的位置
        dispatch(changeComponentPosition({ oldIndex, newIndex }))
    }
    const withIdItems = componentList.map(c => ({ ...c, id: c.fe_id }))
    return (
        <SortableContainer items={withIdItems} onDragEndFn={handleDragEnd}>
            <div className={styles.container}>

                {
                    componentList.length === 0 && (
                        <div className={styles.emptyBox}>
                            <Empty description='暂无组件，快去添加吧~' />
                        </div>
                    )
                }
                {
                    componentList.length > 0 && componentList
                        .filter(item => !item.isHidden)
                        .map((item) => {
                            const { fe_id, isLock = false } = item
                            return (
                                <SortableItem key={fe_id} id={fe_id}>
                                    <div
                                        onClick={(e) => handleClick(e, fe_id)}
                                        key={fe_id}
                                        className={`${styles.componentsStyle} ${fe_id === selectedId ? styles.selected : ''} ${isLock ? styles.locked : ''}`}
                                    >
                                        <div className={styles.disabledElement}>
                                            {
                                                getComponent(item)
                                            }
                                        </div>
                                    </div>
                                </SortableItem>
                            )
                        })
                }
            </div>
        </SortableContainer>
    )
}

export default Canvas;