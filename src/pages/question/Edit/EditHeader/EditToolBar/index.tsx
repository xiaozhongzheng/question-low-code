import { BlockOutlined, CopyOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Space, Tooltip, Button } from 'antd'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import {
    deleteComponentById,
    changeComponentHidden,
    changeComponentLock,
    copySelectComponent,
    addComponents
} from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
const EditToolBar = () => {

    const dispatch = useDispatch()
    const { selectComponent, copyComponent } = useGetComponentInfo()
    const { isLock = false } = selectComponent || {}
    const handleDelete = () => {
        // 删除当前选中的文件
        dispatch(deleteComponentById())
    }

    const handleHidden = () => {
        dispatch(changeComponentHidden({ isHidden: true }))
    }

    const handleLock = () => {
        dispatch(changeComponentLock())
    }

    const handleCopy = () => {
        dispatch(copySelectComponent())
    }
    const handlePaste = () => {
        if (copyComponent) {
            dispatch(addComponents({...copyComponent,fe_id: nanoid()}))
        }
    }
    return (
        <Space>
            <Tooltip title="删除">
                <Button shape='circle' icon={<DeleteOutlined />} onClick={handleDelete}></Button>
            </Tooltip>
            <Tooltip title="隐藏">
                <Button shape='circle' icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
            </Tooltip>
            <Tooltip title="锁定">
                <Button type={isLock ? 'primary' : 'default'} shape='circle' icon={<LockOutlined />} onClick={handleLock}></Button>
            </Tooltip>
            <Tooltip title="复制">
                <Button shape='circle' icon={<CopyOutlined />} onClick={handleCopy}></Button>
            </Tooltip>
            <Tooltip title="粘贴">
                <Button disabled={!copyComponent} shape='circle' icon={<BlockOutlined />} onClick={handlePaste}></Button>
            </Tooltip>
        </Space>
    )
}

export default EditToolBar