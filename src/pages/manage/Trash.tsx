import React, { useState, type FC } from 'react'
import styles from './Common.module.scss';
import { Input, Table, Tag, Space, Button, Modal } from 'antd';
import ListSeatch from '@/components/ListSeatch';
import { Spin } from 'antd';
import { useLoadingQuestionList } from '@/hooks/useLoadingQuestionList';


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
  const { data, loading } = useLoadingQuestionList({ isDeleted: true })
  const { list: dataSource = [], total = 100 } = data || {}
  const [selectIds, setSelectIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = () => {
    alert(`删除${JSON.stringify(selectIds)}`);

  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>回收站</h2>
        <ListSeatch />
      </div>
      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" disabled={!selectIds.length}>恢复</Button>
        <Button danger disabled={!selectIds.length} onClick={() => setIsModalOpen(true)}>彻底删除</Button>
      </Space>
      {
        loading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spin size="large" tip="Loading" >
            </Spin>
          </div>
        )
      }
      {
        !loading && (
          <Table
            rowKey={(v:any) => v.id}
            dataSource={dataSource}
            columns={columns}
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
        )
      }


      <div >底部区域</div>
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