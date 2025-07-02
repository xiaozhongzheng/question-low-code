import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { Space, Tooltip, Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteComponentById,changeComponentHidden } from '@/store/componentsReducer'
const EditToolBar = () => {
    const dispatch = useDispatch()
    const handleDelete = () => {
        // 删除当前选中的文件
        dispatch(deleteComponentById())
    }

    const handleHidden = () => {
        dispatch(changeComponentHidden({isHidden: true}))
    }

    return (
        <Space>
            <Tooltip title="删除">
                <Button shape='circle' icon={<DeleteOutlined />} onClick={handleDelete}></Button>
            </Tooltip>
            <Tooltip title="隐藏">
                <Button shape='circle' icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
            </Tooltip>
        </Space>
    )
}

export default EditToolBar