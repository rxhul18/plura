'use client';
import { useCallback } from 'react';

import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover"
interface DraggableNodeProps {
  type: string;
  label: string;
  id: string;
  data: {
    label: string;
    selected?: string;
  };
  onDrop: (id: string) => void;
  onDelete?: (nodeId: string) => void;
}
const options = [
  { id: '1', label: 'Memory 1' },
  { id: '2', label: 'Memory 2' },
  { id: '3', label: 'Memory 3' },
  { id: '4', label: 'Memory 4' },
  { id: '5', label: 'Memory 5' },
];

export function MemoryDragableNode({ type, id, onDrop, data }: DraggableNodeProps) {
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

  const [open, setOpen] = React.useState(false);

  return (
    <div
      className="rounded-lg flex items-center group"
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      draggable
    >
      <div className="bg-white shadow-md rounded-lg relative">
        <Popover open={open} onOpenChange={setOpen}>
          <Handle type="source" position={Position.Top} className="w-2 h-2 absolute" />
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between border dark:border-gray-200 dark:bg-white dark:text-black"
              onClick={() => setOpen(true)}
            >
              {data.selected
                ? options.find((option) => option.label === data.selected)?.label
                : "Select Memory..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <Handle type="source" position={Position.Bottom} className="w-2 h-2 absolute" />
        </Popover>
      </div>
    </div>
  );
} 