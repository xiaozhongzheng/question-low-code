import React, { type FC } from 'react'
import styles from './index.module.scss';
import { getComponentConfigByType } from '@/components/Question';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { setSelectedId, type ComponentInfoType } from '@/store/componentsReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Empty } from 'antd';
const Canvas: FC = () => {
    // console.log(componentConfigList,'componentConfigList')
    const dispatch = useDispatch()
    const { componentList, selectedId = '' } = useGetComponentInfo()
    console.log(componentList, selectedId, '*&&')
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
    return (
        <div className={styles.container}>
            {/* <div className={styles.componentsStyle}>
                <div className={styles.disabledElement}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles.componentsStyle}>
                <div className={styles.disabledElement}>
                    <QuestionInput />
                </div>
            </div> */}
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
                    const { fe_id } = item

                    return (
                        <div
                            onClick={(e) => handleClick(e, fe_id)}
                            key={fe_id}
                            className={`${styles.componentsStyle} ${fe_id === selectedId ? styles.selected : ''}`}
                        >
                            <div className={styles.disabledElement}>
                                {
                                    getComponent(item)
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Canvas;