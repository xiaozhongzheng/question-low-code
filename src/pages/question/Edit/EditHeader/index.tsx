import React, { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { Space, Button, Typography, Flex, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolBar from './EditToolBar'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { changePageTitle } from '@/store/pageInfoReducer'
import { useDispatch } from 'react-redux'
import { patchQuestionApi } from '@/services/question'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
const { Title } = Typography
const TitleElem: FC = () => {
    const dispatch = useDispatch()
    const { pageInfo } = useGetPageInfo()
    console.log('===header',pageInfo)
    const { title } = pageInfo || {}
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(title)
    const handleSubmit = () => {
        dispatch(changePageTitle({ title: value }))
        setIsEdit(false)
    }
    useEffect(() => {
        title && setValue(title)
    }, [title])
    if (isEdit) {
        return (
            <Input
                style={{ width: '220px' }}
                value={value}
                onChange={(e) => setValue(e.target.value.trim())}
                onPressEnter={handleSubmit}
                onBlur={handleSubmit}
            />
        )
    }
    return (
        <Space>
            <Title level={3}>{title}</Title>
            <Button size='large' onClick={() => setIsEdit(true)} icon={<EditOutlined />} type="text"></Button>
        </Space>
    )
}
const SaveButtonElem: FC = () => {
    const { componentList } = useGetComponentInfo()
    const { pageInfo } = useGetPageInfo()
    const { id } = useParams()
    if (!id) return
    const { run: save, loading } = useRequest(async () => {
        await patchQuestionApi(id, { pageInfo, componentList })
    }, {
        manual: true
    })
    useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
        // 当使用键盘 ctrl + s 时执行保存功能
        e.preventDefault() // 阻止事件默认行为
        if (!loading) {
            save()
        }
    })
    // 自动保存数据(数据改变后1s之后执行)
    useDebounceEffect(() => {
        save()
    }, [componentList, pageInfo], {
        wait: 1000
    })
    return (
        <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>保存</Button>
    )
}
const PublishButtonElem: FC = () => {
    const nav = useNavigate()
    const { componentList } = useGetComponentInfo()
    const { pageInfo } = useGetPageInfo()
    const { id } = useParams()
    if (!id) return
    const { run: save, loading } = useRequest(async () => {
        await patchQuestionApi(id, { pageInfo, componentList,isPublished: true })
        message.success('发布成功')
        nav(`/stat/${id}`)
    }, {
        manual: true
    })
    
    return (
        <Button 
        onClick={save} 
        disabled={loading} 
        type='primary'
        >发布</Button>
    )
}
const EditHeader: FC = () => {
    const nav = useNavigate()
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Flex align="center">
                        <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>返回</Button>
                        <TitleElem />
                    </Flex>
                </div>
                <div className={styles.middle}>
                    <EditToolBar />
                </div>
                <div className={styles.right}>
                    <Space>
                        <SaveButtonElem />
                        <PublishButtonElem />
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default EditHeader