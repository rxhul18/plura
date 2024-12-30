"use client";
import { useCallback } from "react";
import React, { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

interface DraggableNodeProps {
  type: string;
  id: string;
  onDrop: (id: string) => void;
}

export function AgentDragableNode({ type, id, onDrop }: DraggableNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = React.useState(false);

  const onDragStart = useCallback(
    (event: React.DragEvent) => {
      setIsDragging(true);
      event.dataTransfer.setData("application/reactflow", type);
      event.dataTransfer.setData("node/id", id);
      event.dataTransfer.effectAllowed = "move";
    },
    [type, id],
  );

  const handleDragEnd = useCallback(
    (event: React.DragEvent) => {
      setIsDragging(false);
      if (event.dataTransfer.dropEffect === "move") {
        onDrop(id);
      }
    },
    [id, onDrop],
  );

  return (
    <div
      className={`rounded-xl flex justify-center items-center cursor-move transition-all duration-200 ${isDragging ? "opacity-50" : "hover:scale-105"}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`p-1 rounded-lg relative min-w-[200px] transition-all duration-200 dark:border-gray-200 
        ${isDragging ? "bg-transparent shadow-none border-dashed" : isHovered ? "bg-white border-gray-300 shadow-lg transform translate-y-[-2px]" : "bg-white shadow-md border-gray-200"}`}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between border dark:bg-white dark:border-gray-200 dark:text-black"
              onClick={() => setOpen(true)}
            >
              Select Agent...
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </Popover>
      </div>
    </div>
  );
}
