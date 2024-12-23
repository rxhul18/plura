// import React, { Children } from 'react'  
import { Background, ReactFlow } from "@xyflow/react"

import '@xyflow/react/dist/style.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/custom/sidebar/integration-sidebar';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


export default function Integration() {
  return (

    <div className="flex">
      <div className="flex w-full">
        {/* <div style={{ width: '80vw', height: '100vh' }}> */}
        <ReactFlow nodes={initialNodes} edges={initialEdges} className="border border-gray-800 rounded-md">
          <Background />
        </ReactFlow>
      </div>
      <div>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
    </div>
  )
}