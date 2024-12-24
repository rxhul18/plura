import { useCallback } from 'react';

interface DraggableNodeProps {
  type: string;
  label: string;
}

export function DraggableNode({ type, label }: DraggableNodeProps) {
  const onDragStart = useCallback((event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  }, [type]);

  return (
    <div
      className="py-2 px-3 border rounded-md mb-2 cursor-move hover:bg-gray-50"
      onDragStart={onDragStart}
      draggable
    >
      {label}
    </div>
  );
} 