import { useCallback } from 'react';

interface DraggableNodeProps {
  type: string;
  label: string;
  id: string;
  onDrop: (id: string) => void;
}

export function DraggableNode({ type, label, id, onDrop }: DraggableNodeProps) {
  const onDragStart = useCallback((event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.setData('node/id', id);
    event.dataTransfer.effectAllowed = 'move';
  }, [type, id]);

  const handleDragEnd = useCallback((event: React.DragEvent) => {
    if (event.dataTransfer.dropEffect === 'move') {
      onDrop(id);
    }
  }, [id, onDrop]);

  return (
    <div
      className="py-2 px-3 border rounded-md mb-2 cursor-move hover:bg-gray-50"
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      draggable
    >
      {label}
    </div>
  );
} 