import React, { useState, type FC } from 'react';
import styles from './QuestionCard.module.scss';
import { Button, Space, Tag, Popconfirm, Modal,message } from 'antd';
import { EditOutlined, StockOutlined, StarOutlined, CopyOutlined, DeleteOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { patchQuestionApi } from '@/api/question';
import { useRequest } from 'ahooks';
type PropsType = {
    id: string,
    title: string,
    isPublished: boolean,
    isStar: boolean,
    answerCount: number,
    createdAt: string,
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const { id, title, isPublished, isStar, createdAt, answerCount } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStarState,setIsStarState] = useState(isStar);
    const {loading: starLoading,run: changeStar} = useRequest(async () => {
        await patchQuestionApi(id,{isStar: !isStarState})
    },{
        manual: true,
        onSuccess: () => {
            setIsStarState(!isStarState)
            message.success('修改成功~')
        }
    })
    const [del,setDel] = useState(false)
    const {loading: delLoading,run: handleDelete} = useRequest(async () => {
        return await patchQuestionApi(id,{
            isDeleted: true
        })
    },{
        manual: true,
        onSuccess: () => {
            message.success('删除成功~')
            setIsModalOpen(false)
            setDel(true)
        }
    })
    const copyConfirm = () => {
        alert('复制')
    }
    // const handleDelete = () => {
    //     alert('删除了')
    //     setIsModalOpen(false);
    // };
    if(del) return null
    return (
        <div className={styles.main} key={id}>
            <div className={styles.head}>
                <Space>
                    {isStarState && <StarOutlined />}
                    <span className={styles.left}>{title}</span>
                </Space>
                <Space>
                    {
                        isPublished ? (
                            <Tag bordered={false} color="processing">
                                已发布
                            </Tag>
                        ) : (
                            <Tag bordered={false} color="error">
                                未发布
                            </Tag>
                        )
                    }


                    <span>答卷:{answerCount}</span>
                    <span >{createdAt}</span>
                </Space>

            </div>
            <div className={styles.btns}>
                <Space>
                    <Link to={`/question/edit/${id}`}>
                        <Button
                            icon={<EditOutlined />}
                            type='text'
                            size='small'
                        >
                            编辑问卷
                        </Button>
                    </Link>

                    <Button
                        icon={<StockOutlined />}
                        type='text'
                        disabled={!isPublished}
                        size='small'>
                        数据统计
                    </Button>
                </Space>
                <Space >
                    <Button
                        className={styles.btnColor}
                        icon={isStarState ? <StarFilled /> : <StarOutlined />}
                        type='text'
                        onClick={changeStar}
                        disabled={starLoading}
                        size='small'>
                        {isStarState ? '取消标星' : '标星'}
                    </Button>

                    <Popconfirm
                        title="是否复制该问卷"
                        onConfirm={copyConfirm}
                        okText="是"
                        cancelText="否"
                    >
                        <Button
                            className={styles.btnColor}
                            icon={<CopyOutlined />}
                            type='text'
                            size='small'>
                            复制
                        </Button>
                    </Popconfirm>

                    <Button
                        className={styles.btnColor}
                        onClick={() => setIsModalOpen(true)}
                        icon={<DeleteOutlined />}
                        type='text'
                        size='small'>
                        删除
                    </Button>
                </Space>
                <Modal
                    title="确定要删除该问卷吗？"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleDelete}
                    onCancel={() => setIsModalOpen(false)}
                    cancelText="取消"
                    okText="确定"
                >

                </Modal>

            </div>

        </div>
    )
}

export default QuestionCard