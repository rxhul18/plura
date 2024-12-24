'use client';

import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Connection,
  Edge,
  Node,
  addEdge,
  useNodesState,
  useEdgesState,
  XYPosition
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/sidebar/integration-sidebar';
import { SearchSelectNode } from '@/components/custom/nodes/search-select-node';

// Define node types
const nodeTypes = {
  searchSelect: SearchSelectNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Integration() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get the reactflow wrapper bounds
      const reactflowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      
      if (reactflowBounds) {
        const newNode = {
          id: getId(),
          type: type === 'searchSelect' ? 'searchSelect' : 'default',
          position: {
            x: event.clientX - reactflowBounds.left,
            y: event.clientY - reactflowBounds.top,
          },
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [setNodes],
  );

  return (
    <div className="flex">
      <div className="flex w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          className="border border-gray-800 rounded-md"
        >
          <Background />
        </ReactFlow>
      </div>
      <div>
        <SidebarProvider 
          style={{
            "--sidebar-width": "18rem",
          }}
        >
          <AppSidebar />
        </SidebarProvider>
      </div>
    </div>
  );
}