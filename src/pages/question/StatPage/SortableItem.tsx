import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableItem({ id }) {
  // 7. 使用useSortable钩子使项目可排序
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // 8. 应用拖拽样式
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    padding: '16px',
    margin: '8px 0',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  return (
    // 9. 设置可拖拽元素
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {'item'}-{id}
    </div>
  );
}