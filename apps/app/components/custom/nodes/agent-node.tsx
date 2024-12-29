'use client';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import React from 'react';
import { X } from 'lucide-react';
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const options = [
  { id: '1', label: 'Agent 1' },
  { id: '2', label: 'Agent 2' },
  { id: '3', label: 'Agent 3' },
  { id: '4', label: 'Agent 4' },
  { id: '5', label: 'Agent 5' },
];

interface AgentNodeProps {
  data: {
    label: string;
    selected?: string;
  };
  id: string;
  onDelete?: (nodeId: string) => void;
}

export function AgentNode({ id, data, onDelete }: AgentNodeProps) {
  const { setNodes } = useReactFlow();
  const [open, setOpen] = React.useState(false);

  const updateNodeData = (value: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              selected: value
            }
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="rounded-lg flex items-center group">
      <div className="p-1 bg-white shadow-md rounded-lg relative">
        <Handle type="source" position={Position.Bottom} className="w-2 h-2 absolute" />
        <Popover open={open} onOpenChange={setOpen}>
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
                : "Select Agent..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search agents..." />
              <CommandList>
                <CommandEmpty>No agents found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.label}
                      onSelect={(currentValue) => {
                        const newValue = currentValue === data.selected ? "" : currentValue;
                        updateNodeData(newValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          data.selected === option.label ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className='bg-transparent flex items-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300'>
        <button
          aria-label="Delete Node Provider"
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