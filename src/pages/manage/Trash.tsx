import React, { useEffect, useState, type FC } from 'react'
import styles from './Common.module.scss';
import { Input, Table, Tag, Space, Button, Modal, message } from 'antd';
import ListSeatch from '@/components/ListSeatch';
import { Spin } from 'antd';
import { useLoadingQuestionList } from '@/hooks/useLoadingQuestionList';
import ListPage from '@/components/ListPage';
import MyLoading from '@/components/MyLoading';
import { useRequest } from 'ahooks';
import { patchQuestionApi } from '@/services/question';
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    key: 'isPublished',
    render: (isPublished: boolean) => isPublished ? (
      <Tag bordered={false} color="processing">
        已发布
      </Tag>
    ) : (
      <Tag bordered={false} color="error">
        未发布
      </Tag>
    )
  },
  {
    title: '答卷数',
    dataIndex: 'answerCount',
    key: 'answerCount',
  },
  {
    title: '答卷时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
]
const Trash: FC = () => {
  const { data, loading,refresh } = useLoadingQuestionList({ isDeleted: true })
  const { list: dataSource = [], total = 100 } = data || {}
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {

  },[])
  const handleDelete = () => {
    alert(`删除${JSON.stringify(selectIds)}`);

  }
  const {run: handleRecover} = useRequest(async () => {
    // 使用for await 类似于 Promise.all 方法，顺序处理axios请求
    for await (const id of selectIds){
      await patchQuestionApi(id,{
        isDeleted: false
      })
    }
  },{
    manual: true,
    debounceWait: 500, // 防抖
    onSuccess: () => {
      message.success('删除成功~')
      refresh() // 重新获取分页数据
    }
  })
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>回收站</h2>
        <ListSeatch />
      </div>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={!selectIds.length} onClick={handleRecover}>恢复</Button>
        <Button danger disabled={!selectIds.length} onClick={() => setIsModalOpen(true)}>彻底删除</Button>
      </Space>
      {
        loading && dataSource.length === 0 && (
          <MyLoading />
        )
      }
      {
        !!dataSource.length && (
          <>
            <Table
              rowKey={(v: any) => v.id}
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowSelection={
                {
                  type: 'checkbox',
                  onChange: selectedRowKeys => {
                    console.log('selectedRowKeys', selectedRowKeys)
                    setSelectIds(selectedRowKeys as string[])
                  }
                }
              }
            />
            <div className={styles.footer}>
              <ListPage total={total} />
            </div>
          </>

        )
      }

      <Modal
        title="确认彻底删除问卷"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        cancelText="取消"
        okText="确定"
      >

      </Modal>
    </div>
  )
}
export default Trash