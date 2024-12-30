"use client";

import React, { useCallback, useState } from "react";

export const services = [
  { id: "discord", label: "Discord Service" },
  { id: "youtube", label: "YouTube Service" },
  { id: "nano", label: "Nano Service" },
];

interface ServiceNodeProps {
  type: string;
  data: {
    label: string;
    serviceId?: string;
  };
  id: string;
  onDrop?: (id: string) => void;
}

export function ServiceDragableNode({
  type,
  id,
  data,
  onDrop,
}: ServiceNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onDragStart = useCallback(
    (event: React.DragEvent) => {
      setIsDragging(true);
      event.dataTransfer.setData("application/reactflow", type);
      event.dataTransfer.setData("node/id", id);
      event.dataTransfer.setData(
        "node/data",
        JSON.stringify({
          label: data.label,
          serviceId: data.serviceId || id,
        }),
      );
      event.dataTransfer.effectAllowed = "move";
    },
    [type, id, data],
  );

  const handleDragEnd = useCallback(
    (event: React.DragEvent) => {
      setIsDragging(false);
      if (event.dataTransfer.dropEffect === "move" && onDrop) {
        onDrop(id);
      }
    },
    [id, onDrop],
  );

  return (
    <div
      className={`rounded-xl flex justify-center items-center cursor-move transition-all duration-200 ease-in-out
                ${isDragging ? "opacity-50" : "hover:scale-105"}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full p-2 rounded-lg relative min-w-[150px] border transition-all duration-200 
                ${
                  isDragging
                    ? "bg-transparent shadow-none border"
                    : isHovered
                      ? "bg-white border-gray-300 shadow-lg transform translate-y-[-2px]"
                      : "bg-white shadow-md border-gray-200"
                }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-center w-full dark:text-black">
            {data.label}
          </span>
        </div>
      </div>
    </div>
  );
}
