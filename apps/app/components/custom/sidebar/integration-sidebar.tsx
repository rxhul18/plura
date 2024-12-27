"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from "@/components/ui/button"
import { DraggableNode } from "./draggable-node";

export function AppSidebar({ deletedNodeIds = [] }: { deletedNodeIds?: string[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const [usedNodes, setUsedNodes] = useState<Set<string>>(new Set());

  // Remove deleted nodes from usedNodes
  useEffect(() => {
    if (deletedNodeIds.length > 0) {
      setUsedNodes(prev => {
        const newSet = new Set(prev);
        deletedNodeIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    }
  }, [deletedNodeIds]);

  const handleNodeDrop = (nodeId: string) => {
    setUsedNodes(prev => new Set([...prev, nodeId]));
  };

  return (
    <Sidebar side="right" collapsible="none" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <main>
            <SidebarTrigger />
          </main>
          <SidebarGroupContent className="mt-5 flex flex-col h-screen">
            <aside>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Agent</h3>
                {!usedNodes.has('agent') && (
                  <DraggableNode 
                    type="agentNode" 
                    label="Search & Select Node" 
                    id="agent"
                    onDrop={handleNodeDrop}
                  />
                )}
              </div>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Memory</h3>
                {!usedNodes.has('memory') && (
                  <DraggableNode 
                    type="memoryNode" 
                    label="Search & Select Node" 
                    id="memory"
                    onDrop={handleNodeDrop}
                  />
                )}
              </div>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Services</h3>
                {!usedNodes.has('service1') && (
                  <DraggableNode 
                    type="searchSelect" 
                    label="Search & Select Node" 
                    id="service1"
                    onDrop={handleNodeDrop}
                  />
                )}
                {!usedNodes.has('service2') && (
                  <DraggableNode 
                    type="searchSelect" 
                    label="Search & Select Node" 
                    id="service2"
                    onDrop={handleNodeDrop}
                  />
                )}
                {!usedNodes.has('service3') && (
                  <DraggableNode 
                    type="searchSelect" 
                    label="Search & Select Node" 
                    id="service3"
                    onDrop={handleNodeDrop}
                  />
                )}
                {!usedNodes.has('service4') && (
                  <DraggableNode 
                    type="searchSelect" 
                    label="Search & Select Node" 
                    id="service4"
                    onDrop={handleNodeDrop}
                  />
                )}
              </div>
            </aside>
            <Button 
              className="w-full mt-auto mb-4" 
              variant="default"
              onClick={() => console.log("Submitted")}
            >
              Submit
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}