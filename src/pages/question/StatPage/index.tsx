import { useTitle } from 'ahooks'
import { useLoadingQuestion } from '@/hooks/useLoadingQuestion'
import styles from './index.module.scss'

import React, { useEffect, useState, type FC } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';

type ComponentType = {
    fe_id: string,
    title: string
}

const StatPage: FC = () => {
    const { loading, question } = useLoadingQuestion();
    useTitle('小穆问卷-标星问卷')

    // // 1. 定义可排序的数据状态
    // const [items, setItems] = useState([
    //     { id: '1', text: '项目1' },
    //     { id: '2', text: '项目2' },
    //     { id: '3', text: '项目3' },
    //     { id: '4', text: '项目4' },
    // ]);
    const [items,setItems] = useState<ComponentType[]>([
        {fe_id: 'c1',title: '组件1'},
        {fe_id: 'c2',title: '组件2'},
        {fe_id: 'c3',title: '组件3'},
        
    ])


    // 2. 配置传感器 - 用于检测不同的输入方法
    const sensors = useSensors(
        useSensor(PointerSensor), // 鼠标/触摸屏输入
    );

    // 3. 处理拖拽结束事件
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                // 找到拖拽项目的当前索引和目标位置索引
                const oldIndex = items.findIndex(item => item.fe_id === active.id);
                const newIndex = items.findIndex(item => item.fe_id === over.id);
                console.log(oldIndex,newIndex,'index--')
                // 使用arrayMove重新排序数组
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const withIdItems = items.map(item => ({...item,id: item.fe_id}))

    return (
        <div className={styles.edit}>
            <header className={styles.head}>
                {loading ? <p>加载中...</p> : <p>{666}</p>}
            </header>
            {/* TODO */}
            {/* // 4. DndContext 提供拖拽上下文 */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter} // 碰撞检测策略
                onDragEnd={handleDragEnd}
            >
                {/* 5. SortableContext 定义可排序的上下文 */}
                <SortableContext
                    items={withIdItems} // 传入可排序项目
                    strategy={verticalListSortingStrategy} // 垂直排序策略
                >
                    {/* 6. 渲染可排序项目列表 */}
                    <div className="sortable-list">
                        {withIdItems.map((item) => (
                            <SortableItem key={item.id} id={item.id}  />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}



export default StatPage
