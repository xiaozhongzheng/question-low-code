import React, { type FC, type JSX } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
type PropsType = {
  id: string,
  children: JSX.Element
}
const SortableItem:FC<PropsType> = (props: PropsType) => {
  const {id,children} = props
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
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    // 9. 设置可拖拽元素
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default SortableItem