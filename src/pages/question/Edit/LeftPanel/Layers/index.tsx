import React, { useState, type ChangeEvent } from 'react'
import styles from './index.module.scss'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { Button, Input, message } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
    changeComponentTitle,
    setSelectedId,
    changeComponentLock,
    changeComponentHidden,
    changeComponentPosition
} from '@/store/componentsReducer'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
const Layers = () => {
    const { componentList, selectedId } = useGetComponentInfo()
    const dispatch = useDispatch()
    const [activeIndex, setActiveIndex] = useState(-1)
    const [curId, setCurId] = useState('')
    const [value, setValue] = useState('') // 当前输入框的值

    const handleClick = (index: number) => {
        const { fe_id, isHidden, title } = componentList[index]
        if (isHidden) {
            setActiveIndex(-1)
            return message.warning('不可点击被隐藏的组件！')
        }
        console.log(activeIndex, index)
        if (activeIndex >= 0 && activeIndex === index) {
            // 已经点击某个标题，并且继续点击则显示输入框
            setCurId(fe_id)
            setValue(title)
            return
        }
        dispatch(setSelectedId(fe_id))
        setActiveIndex(index)
    }
    const handleHidden = (selectId: string, isHidden: boolean) => {
        dispatch(changeComponentHidden({ isHidden: !isHidden, selectId }))
    }
    const handleLock = (selectId: string) => {
        dispatch(changeComponentLock({ selectId }))
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setValue(value)
    }
    const changeTitle = () => {
        setCurId('')
        dispatch(changeComponentTitle({ value }))
    }
    const handleDragEnd = (oldIndex: number, newIndex: number) => {
        console.log(oldIndex, newIndex, '===---')
        dispatch(changeComponentPosition({oldIndex,newIndex}))
    }
    const withIdItems = componentList.map(c => ({ ...c, id: c.fe_id }))
    return (
        <SortableContainer items={withIdItems} onDragEndFn={handleDragEnd}>
            <div className={styles.main}>
                <section className={styles.list}>
                    {
                        componentList.map((item, index) => {
                            const { fe_id, title, isHidden, isLock } = item
                            return (
                                <SortableItem key={fe_id} id={fe_id}>
                                    <div
                                        className={`${styles.item} ${selectedId === fe_id ? styles.active : ''}`}
                                    >
                                        <div
                                            onClick={() => handleClick(index)}
                                            className={styles.title}>
                                            {fe_id === curId ?
                                                <Input
                                                    onBlur={changeTitle}
                                                    onPressEnter={changeTitle}
                                                    onChange={handleChange}
                                                    value={value} />
                                                :
                                                title}
                                        </div>
                                        <Button onClick={() => handleHidden(fe_id, isHidden)} type={isHidden ? 'primary' : 'default'} shape='circle' icon={<EyeInvisibleOutlined />} ></Button>
                                        <Button onClick={() => handleLock(fe_id)} type={isLock ? 'primary' : 'default'} shape='circle' icon={<LockOutlined />}></Button>
                                    </div>
                                </SortableItem>
                            )
                        })
                    }
                </section>
            </div>
        </SortableContainer>
    )
}

export default Layers