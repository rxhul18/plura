"use client";

import { useCallback, useState, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { IntegrationToolbar } from "@/components/custom/workflow/workflow-dock";
import CustomEdge from "@/components/custom/workflow/edges/custom-edge";
import { MemoryNode } from "@/components/custom/workflow/nodes/memory-node";
import { AgentNode } from "@/components/custom/workflow/nodes/agent-node";
import { ServiceNode } from "@/components/custom/workflow/nodes/services-node";

// Move nodeTypes definition outside the component
const createNodeTypes = (handleNodeDelete: (nodeId: string) => void) => ({
  agentNode: (props: any) => <AgentNode {...props} onDelete={handleNodeDelete} />,
  memoryNode: (props: any) => <MemoryNode {...props} onDelete={handleNodeDelete} />,
  serviceNode: (props: any) => <ServiceNode {...props} onDelete={handleNodeDelete} />,
});

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Workflow = function() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [deletedNodeIds, setDeletedNodeIds] = useState<string[]>([]);

  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const handleNodeDelete = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setDeletedNodeIds((prev) => [...prev, nodeId]);
    },
    [setNodes],
  );

  // Create nodeTypes once using the callback
  const nodeTypes = useMemo(
    () => createNodeTypes(handleNodeDelete),
    [handleNodeDelete]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge: Edge = {
        source: connection.source!,
        target: connection.target!,
        id: `edge-${crypto.randomUUID()}`, // Generate unique ID
        animated: true,
        type: "customEdge",
      };

      setEdges((prevEdges) => [...prevEdges, edge]);
    },
    [], // Remove edges dependency as we're using the setter function
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const nodeId = event.dataTransfer.getData("node/id");
      const nodeData = event.dataTransfer.getData("node/data");



      if (typeof type === "undefined" || !type) {
        return;
      }

        

      
        let newNode;
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        switch (type) {
          case "agentNode":
            newNode = {
              id: nodeId || getId(),
              type: "agentNode",
              position,
              data: {
                label: `${type} node`,
                selected: "",
              },
            };
            break;
          case "memoryNode":
            newNode = {
              id: nodeId || getId(),
              type: "memoryNode",
              position,
              data: { label: `${type} node` },
            };
            break;
          case "serviceNode":
            const parsedData = nodeData ? JSON.parse(nodeData) : null;
            newNode = {
              id: nodeId || getId(),
              type: "serviceNode",
              position,
              data: parsedData || { label: `${type} node` },
            };
            break;
          default:
            newNode = {
              id: nodeId || getId(),
              type: "default",
              position,
              data: { label: `${type} node` },
            };
        }
        setNodes((nds) => nds.concat(newNode));
      },
    [screenToFlowPosition , setNodes],
  );

  return (
    <div className="flex" style={{ height: "calc(100% - 52px)" }} >
      <div className="flex w-full" ref={reactFlowWrapper} >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className="rounded-md relative"
        >
          <IntegrationToolbar deletedNodeIds={deletedNodeIds} />
          <Controls className="absolute dark:bg-white dark:text-black" />
          <Background className="bg-white dark:bg-white" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function Workflows() {
  return (
    <ReactFlowProvider>
      <Workflow />
    </ReactFlowProvider>
  );
};