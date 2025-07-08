import React, { type FC, type JSX } from 'react'

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

type PropsType = {
    children: JSX.Element | JSX.Element[],
    items: Array<{ id: string, [key: string]: any }>,
    onDragEndFn: (oldIndex: number, newIndex: number) => void
}
const SortableContainer: FC<PropsType> = (props: PropsType) => {
    const { children, items, onDragEndFn } = props
    // 2. 配置传感器 - 用于检测不同的输入方法
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8 // 表示鼠标移动超过8px时才会触发拖拽事件
            }
        }), // 鼠标/触摸屏输入
    );

    // 3. 处理拖拽结束事件
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            // 找到拖拽项目的当前索引和目标位置索引
            const oldIndex = items.findIndex(item => item.fe_id === active.id);
            const newIndex = items.findIndex(item => item.fe_id === over.id);
            onDragEndFn(oldIndex, newIndex)
            // // 使用arrayMove重新排序数组
            // arrayMove(items, oldIndex, newIndex);
        }
    }
    return (
        <>
            {/* // 4. DndContext 提供拖拽上下文 */}
            < DndContext
                sensors={sensors}
                collisionDetection={closestCenter} // 碰撞检测策略
                onDragEnd={handleDragEnd}
            >
                {/* 5. SortableContext 定义可排序的上下文 */}
                <SortableContext
                    items={items} // 传入可排序项目
                    strategy={verticalListSortingStrategy} // 垂直排序策略
                >
                    {/* 6. 渲染可排序项目列表 */}
                    {children}
                </SortableContext>
            </DndContext >
        </>
    )
}

export default SortableContainer