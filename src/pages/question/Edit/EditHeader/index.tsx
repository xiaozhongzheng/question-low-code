import React, { useEffect, useState, type FC } from 'react'
import styles from './index.module.scss'
import { Space, Button, Typography, Flex, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolBar from './EditToolBar'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { changePageTitle, setPageInfo } from '@/store/pageInfoReducer'
import { useDispatch } from 'react-redux'
import { patchQuestionApi } from '@/api/question'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks'
import { nanoid } from 'nanoid'
import type { QuestionSchema } from '@/components/Question'
import { setComponents } from '@/store/componentsReducer'
const { Title } = Typography
const questionList = JSON.parse(localStorage.getItem('questionList') || '[]') || [] as QuestionSchema[]

const TitleElem: FC = () => {
    const dispatch = useDispatch()
    const { pageInfo } = useGetPageInfo()
    console.log('===header', pageInfo)
    const { title = '' } = pageInfo || {}
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(title)
    useEffect(() => {
        if (title) setValue(title)
    }, [title])
    const handleSubmit = () => {
        dispatch(changePageTitle({ title: value }))
        setIsEdit(false)
    }

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
    const { id = '' } = useParams()
    useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
        // 当使用键盘 ctrl + s 时执行保存功能
        e.preventDefault() // 阻止事件默认行为
        if (!loading) {
            handleEdit(id)
        }
    })
    // // 自动保存数据(数据改变后1s之后执行)
    // useDebounceEffect(() => {
    //     handleEdit(id)
    // }, [componentList, pageInfo, id], {
    //     wait: 1000
    // })
    // const { run: save, loading } = useRequest(async () => {
    //     if(!id) return
    //     await patchQuestionApi(id, { pageInfo, componentList })
    // }, {
    //     manual: true
    // })
    const loading = false
    const nav = useNavigate()
    const dispatch = useDispatch()
    const handleSave = () => {
        const data: QuestionSchema = {
            id: nanoid(),
            metadata: {
                title: pageInfo.title,
                isPublished: false,
                isStar: false,
                answerCount: 0,
                createdAt: new Date(),
                isDeleted: false,
            },
            pageInfo,
            componentList
        }
        questionList.push(data)
        localStorage.setItem('questionList', JSON.stringify(questionList))
        message.success('新建成功~')
     
        setTimeout(() => {
            nav('/manage/list')
        }, 500)
    }
    const handleEdit = (id: string) => {
        const index = questionList.findIndex(item => item.id === id)
        questionList[index] = { ...questionList[index], componentList, pageInfo }
        localStorage.setItem('questionList', JSON.stringify(questionList))
        message.success('编辑成功~')
        // dispatch(setComponents([]))
        // dispatch(setPageInfo({ title: '' }))
        setTimeout(() => {
            nav('/manage/list')
        }, 500)
    }
    if (!id) {
        return (
            <Button onClick={handleSave} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>新建</Button>
        )
    }
    return (
        <Button onClick={() => handleEdit(id)} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>保存</Button>
    )
}
const PublishButtonElem: FC = () => {
    const nav = useNavigate()
    // const { componentList } = useGetComponentInfo()
    // const { pageInfo } = useGetPageInfo()
    const { id = '' } = useParams()
    // const { run: save, loading } = useRequest(async () => {
    //     if (!id) return
    //     await patchQuestionApi(id, { pageInfo, componentList, isPublished: true })
    //     message.success('发布成功')
    //     nav(`/stat/${id}`)
    // }, {
    //     manual: true
    // })
    const handlePublish = () => {
        const item = questionList.find(item => item.id === id) as QuestionSchema
        item.metadata.isPublished = true
        localStorage.setItem('questionList', JSON.stringify(questionList))
        message.success('发布成功')
        setTimeout(() => {
            nav('/manage/list')
        }, 500)

    }
    return (
        <Button
            onClick={handlePublish}
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