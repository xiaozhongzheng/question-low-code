import React, { type FC } from 'react'
import styles from './index.module.scss';
import { getComponentConfigByType } from '@/components/Question';
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo';
import { setSelectedId, type ComponentInfoType } from '@/store/componentsReducer';
import { useSelector,useDispatch } from 'react-redux';
const Canvas: FC = () => {
    // console.log(componentConfigList,'componentConfigList')
    const dispatch = useDispatch()
    const { componentList,selectedId } = useGetComponentInfo()
    console.log(componentList, 'componentList')
    const getComponent = (componentInfo: ComponentInfoType) => {
        const { type, props } = componentInfo
        const componentConfig = getComponentConfigByType(type)
        const { Component } = componentConfig || {}
        if (!Component) return null
        return <Component {...props} />
    }
    const handleClick = (id: string) => {
        dispatch(setSelectedId(id))
        console.log(componentList,'***')
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
                componentList.map((item) => {
                    const { fe_id } = item

                    return (
                        <div
                        onClick={() => handleClick(fe_id)}
                         key={fe_id} 
                         className={`${styles.componentsStyle} ${fe_id === selectedId ? styles.selected: ''}`}
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