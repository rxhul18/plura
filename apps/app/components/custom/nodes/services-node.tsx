'use client';

import { Handle, Position, useReactFlow } from '@xyflow/react';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

const options = [
  { id: '1', label: 'Services 1' },
  { id: '2', label: 'Services 2' },
  { id: '3', label: 'Services 3' },
  { id: '4', label: 'Services 4' },
  { id: '5', label: 'Services 5' },
];

interface SearchSelectNodeProps {
  data: {
    label: string;
    selected?: string;
  };
  id: string;
  onDelete?: (nodeId: string) => void;
}

export function SearchSelectNode({ data, id, onDelete }: SearchSelectNodeProps) {

  const { setNodes } = useReactFlow();

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(data.selected || '');

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: typeof options[0]) => {
    setSelected(option.label);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      
      {!selected ? (
        <div>
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsOpen(true);
                }}
                className="w-full px-3 py-2 border rounded-md pr-10"
                placeholder="Search services..."
                onClick={() => setIsOpen(true)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-[200px] overflow-y-auto z-50">
                {filteredOptions.map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="font-medium">{selected}</span>
          <button
            onClick={() => setSelected('')}
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            Change
          </button>
        </div>
      )}
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
  );
}