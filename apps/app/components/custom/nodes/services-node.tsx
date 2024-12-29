'use client';

import { Handle, Position, useReactFlow } from '@xyflow/react';
import React, { useCallback } from 'react';
import { X } from 'lucide-react';

export const services = [
  { id: 'discord', label: 'Discord Service' },
  { id: 'youtube', label: 'YouTube Service' },
  { id: 'nano', label: 'Nano Service' }
];

interface ServiceNodeProps {
  type: string;
  data: {
    label: string;
    serviceId?: string;
  };
  id: string;
  onDelete?: (nodeId: string) => void;
  onDrop?: (id: string) => void;
}

export function ServiceNode({ type, id, data, onDelete, onDrop }: ServiceNodeProps) {
  const { setNodes } = useReactFlow();

  const onDragStart = useCallback((event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.setData('node/id', id);
    event.dataTransfer.setData('node/data', JSON.stringify({
      label: data.label,
      serviceId: data.serviceId || id
    }));
    event.dataTransfer.effectAllowed = 'move';
  }, [type, id, data]);

  const handleDragEnd = useCallback((event: React.DragEvent) => {
    if (event.dataTransfer.dropEffect === 'move' && onDrop) {
      onDrop(id);
    }
  }, [id, onDrop]);

  return (
    <div 
      className="rounded-lg flex justify-center items-center group cursor-move "
      draggable
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-2 bg-white shadow-md rounded-lg relative min-w-[150px] border">
        <Handle type="target" position={Position.Top} className="w-2 h-2" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{data.label}</span>
        </div>
      </div>
      <div className='bg-transparent flex items-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300'>
        <button
          aria-label="Delete Node"
          className="text-red-500 bg-transparent p-1 hover:bg-gray-100 rounded-full pointer-events-auto"
          onClick={() => {
            if (onDelete) {
              onDelete(id);
            } else {
              setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
            }
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}