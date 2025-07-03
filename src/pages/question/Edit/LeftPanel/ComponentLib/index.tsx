import React, { type FC } from 'react'
import { componentConfigGroup, type ComponentConfigType, getComponentConfigByType } from '@/components/Question'
import { Typography } from 'antd'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { addComponents } from '@/store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'
const { Title } = Typography
const ComponentLib: FC = () => {
    const dispatch = useDispatch()
    console.log(componentConfigGroup,'componentConfigGroup')
    const getComponent = (component: ComponentConfigType) => {
        const { Component, type, title, defaultProps } = component
        const handleAdd = (e: MouseEvent) => {
            e.stopPropagation()
            dispatch(addComponents({
                fe_id: nanoid(),
                type,
                title,
                isLock: false,
                isHidden: false,
                props: defaultProps
            }))
        }
        if (!Component) return null
        return (
            <div onClick={(e) => handleAdd(e)} key={type} className={styles.component}>
                <div className={styles.disabledEvent}>
                    <Component />
                </div>
            </div>
        )
    }
    return (
        <div className={styles.main}>
            {
                componentConfigGroup.map((item, index) => {
                    const { groupName, components } = item
                    return (
                        <div key={index} className={styles.item}>
                            <Title style={{color: 'skyblue'}} level={4}>{groupName}</Title>
                            {
                                components.map(c => getComponent(c as ComponentConfigType))
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ComponentLib