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
  XYPosition,
  Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar, IntegrationToolbar } from '@/components/custom/sidebar/integration-sidebar';
import { SearchSelectNode } from '@/components/custom/nodes/services-node';
import CustomEdge from '@/components/custom/edges/custom-edge';
import { MemoryNode } from '@/components/custom/nodes/memory-node';
import WorkflowsDock from '@/components/motion-ui/workflow-dock';
import { AgentNode } from '@/components/custom/nodes/agent-node';
import { ServiceNode } from '@/components/custom/nodes/services-node';

// Define node types
const nodeTypes = {
  agentNode: AgentNode,
  memmoryNode: MemoryNode,
  serviceNode: ServiceNode,
  
  // searchSelect: SearchSelectNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Integration() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [deletedNodeIds, setDeletedNodeIds] = useState<string[]>([]);

  const handleNodeDelete = useCallback((nodeId: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setDeletedNodeIds((prev) => [...prev, nodeId]);
  }, [setNodes]);

  // const onConnect = useCallback(
  //   (params: Connection) => setEdges((eds) => addEdge(params, eds)),
  //   [edges],
  // );

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: Edge = {
        source: connection.source!,
        target: connection.target!,
        id: `edge-${crypto.randomUUID()}`, // Generate unique ID
        animated: true,
        type: 'customEdge',
        // Add any other edge properties you need
      };
      
      setEdges((prevEdges) => [...prevEdges, edge]);
    },
    [] // Remove edges dependency as we're using the setter function
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const nodeId = event.dataTransfer.getData('node/id');
      const nodeData = event.dataTransfer.getData('node/data');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const reactflowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      
      if (reactflowBounds) {
        let newNode;
        const position = {
          x: event.clientX - reactflowBounds.left,
          y: event.clientY - reactflowBounds.top,
        };

        switch (type) {
          case 'agentNode':
            newNode = {
              id: nodeId || getId(),
              type: 'agentNode',
              position,
              data: { 
                label: `${type} node`,
                selected: "" 
              },
            };
            break;
          case 'memoryNode':
            newNode = {
              id: nodeId || getId(),
              type: 'memoryNode',
              position,
              data: { label: `${type} node` },
            };
            break;
          case 'serviceNode':
            const parsedData = nodeData ? JSON.parse(nodeData) : null;
            newNode = {
              id: nodeId || getId(),
              type: 'serviceNode',
              position,
              data: parsedData || { label: `${type} node` },
            };
            break;
          default:
            newNode = {
              id: nodeId || getId(),
              type: 'default',
              position,
              data: { label: `${type} node` },
            };
        }

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [setNodes],
  );

  return (
    <div className="flex" style={{ height: "calc(100% - 52px)" }}>
      <div className="flex w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={{
            agentNode: (props) => (
              <AgentNode {...props} onDelete={handleNodeDelete} />
            ),
            memoryNode: (props) => (
              <MemoryNode {...props} onDelete={handleNodeDelete} />
            ),
            serviceNode: (props) => (
              <ServiceNode {...props} onDelete={handleNodeDelete} />
            )
          }}

          // nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className=" rounded-md relative"
        >
          {/* <WorkflowsDock /> */}
          <IntegrationToolbar deletedNodeIds={deletedNodeIds} />
          <Controls  className='absolute'/>
          <Background className='bg-white dark:bg-white'/> 
        </ReactFlow>
      </div>
      <div>
        {/* <SidebarProvider 
          style={{
            "--sidebar-width": "18rem",
          } as React.CSSProperties}
        >
          <AppSidebar deletedNodeIds={deletedNodeIds} />
        </SidebarProvider> */}
      </div>
    </div>
  );
}