import { BlockOutlined, CopyOutlined, DeleteOutlined, DownOutlined, EyeInvisibleOutlined, LockOutlined, RedoOutlined, UndoOutlined, UpOutlined } from '@ant-design/icons'
import { Space, Tooltip, Button } from 'antd'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import {
    deleteComponentById,
    changeComponentHidden,
    changeComponentLock,
    copySelectComponent,
    addComponents,
    changeComponentPosition,
    undo,
    redo,
} from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
const EditToolBar = () => {

    const dispatch = useDispatch()
    const { selectComponent, copyComponent,componentList,selectedId } = useGetComponentInfo()
    const { isLock = false } = selectComponent || {}
    const index = componentList.findIndex(c => c.fe_id === selectedId)
    const isFirst = index <= 0
    const isLast = index >= componentList.length - 1 || index<0
    const handleDelete = () => {
        // 删除当前选中的文件
        dispatch(deleteComponentById())
    }

    const handleHidden = () => {
        dispatch(changeComponentHidden({ isHidden: true }))
    }

    const handleLock = () => {
        dispatch(changeComponentLock({}))
    }

    const handleCopy = () => {
        dispatch(copySelectComponent())
    }
    const handlePaste = () => {
        if (copyComponent) {
            dispatch(addComponents({...copyComponent,fe_id: nanoid()}))
            // dispatch(recordSnapshot())
        }
    }
    const handleUpMove = () => {
        dispatch(changeComponentPosition({oldIndex: index,newIndex: index-1}))
    }
    const handleDownMove = () => {
        dispatch(changeComponentPosition({oldIndex: index,newIndex: index+1}))
    }
    const handleUndo = () => {
        dispatch(undo())
    }
    const handleRedo = () => {
        dispatch(redo())
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
            <Tooltip title="上移">
                <Button disabled={isFirst} shape='circle' icon={<UpOutlined />} onClick={handleUpMove}></Button>
            </Tooltip>
            <Tooltip title="下移">
                <Button disabled={isLast} shape='circle' icon={<DownOutlined />} onClick={handleDownMove}></Button>
            </Tooltip>
             <Tooltip title="撤销">
                <Button  shape='circle' icon={<UndoOutlined />} onClick={handleUndo}></Button>
            </Tooltip>
            <Tooltip title="重做">
                <Button  shape='circle' icon={<RedoOutlined />} onClick={handleRedo}></Button>
            </Tooltip>
        </Space>
    )
}

export default EditToolBar