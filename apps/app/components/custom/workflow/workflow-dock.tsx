"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { Bot, Brain, Workflow, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';
import useClickOutside from '@/hooks/useClickOutside';
import { AgentDragableNode } from "./nodes/draggable/agent-dragable-node";
import { MemoryDragableNode } from "./nodes/draggable/memory-dragable-node";
import { services } from './nodes/services-node';
import { ServiceDragableNode } from "./nodes/draggable/service-dragable-node";
import { useReactFlow } from '@xyflow/react';

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
};

const TOOLBAR_ITEMS = [
  {
    id: 'agent',
    label: 'Agent',
    title: <Bot className="h-4 w-4 sm:h-5 sm:w-5 dark:text-black" />,
    type: "agentNode",
  },
  {
    id: 'memory',
    label: 'Memory',
    title: <Brain className="h-4 w-4 sm:h-5 sm:w-5 dark:text-black" />,
    type: "memoryNode",
  },
  {
    id: 'services',
    label: 'Services',
    title: <Workflow className="h-4 w-4 sm:h-5 sm:w-5 dark:text-black" />,
    type: "serviceNode",
    subItems: services.map(service => service.id)
  }
];

export function IntegrationToolbar({ deletedNodeIds = [] }: { deletedNodeIds?: string[] }) {
  const { getNodes, getEdges } = useReactFlow();
  const [active, setActive] = useState<string | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);
  const [usedNodes, setUsedNodes] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  const memoizedMaxWidth = useMemo(() => {
    if (!widthContainer || maxWidth > 0) return maxWidth;
    return widthContainer;
  }, [widthContainer, maxWidth]);
  
  useEffect(() => {
    if (memoizedMaxWidth !== maxWidth) {
      setMaxWidth(memoizedMaxWidth);
    }
  }, [memoizedMaxWidth, maxWidth]);

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

  const handleSubmit = () => {
    const nodes = getNodes();
    const edges = getEdges();
    
    const nodePositions = nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
      connections: {
        // Find all edges where this node is the source
        sourceOf: edges
          .filter(edge => edge.source === node.id)
          .map(edge => edge.target),
        // Find all edges where this node is the target
        targetOf: edges
          .filter(edge => edge.target === node.id)
          .map(edge => edge.source)
      }
    }));

    console.log('Workflow Configuration:', {
      nodes: nodePositions,
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target
      }))
    });

    return {
      nodes: nodePositions,
      edges
    };
  };

  return (
    <MotionConfig transition={transition}>
      <div className="absolute bottom-8 w-full justify-center flex" ref={ref}>
        <div className="h-full w-fit z-10 rounded-xl border border-zinc-950/10 bg-white">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  // style={{ width: maxWidth }}
                >
                  <div ref={contentRef}>
                    {TOOLBAR_ITEMS.map((item) => {
                      const isSelected = active === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className={cn('bg-transparent', isSelected ? 'block' : 'hidden')}>
                            {item.id === 'agent' && (
                              !usedNodes.has(item.id) && (
                                <div className="p-2">
                                  <AgentDragableNode
                                    type={item.type}
                                    id={item.id}
                                    onDrop={handleNodeDrop}
                                  />
                                </div>
                              )
                            )}
                            {item.id === 'memory' && (
                              !usedNodes.has(item.id) && (
                                <div className="p-2">
                                  <MemoryDragableNode
                                    type={item.type}
                                    id={item.id}
                                    onDrop={handleNodeDrop}
                                  />
                                </div>
                              )
                            )}
                            {item.id === 'services' && (
                              <div className="flex flex-col gap-2 p-2">
                                <div className="relative">
                                  <input
                                    type="text"
                                    placeholder="Search services..."
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-white placeholder-black dark:border-gray-200 dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                  />
                                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-black pointer-events-none" />
                                </div>
                                <div className="flex flex-col gap-2 mt-2">
                                  {services
                                    .filter(service => 
                                      service.label.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((service) => (
                                      !usedNodes.has(service.id) && (
                                        <ServiceDragableNode
                                          key={service.id}
                                          type={item.type}
                                          data={{ 
                                            label: service.label,
                                            serviceId: service.id 
                                          }}
                                          id={service.id}
                                          onDrop={handleNodeDrop}
                                        />
                                      )
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center space-x-2 p-2" ref={menuRef}>
            {TOOLBAR_ITEMS.map((item) => (
              <Button
                key={item.id}
                variant={active === item.id ? 'secondary' : 'ghost'}
                aria-label={item.label}
                className={cn(
                  `relative flex h-9 w-9 rounded-lg transition-colors hover:bg-secondary dark:hover:bg-primary`, active === item.id ? 'bg-secondary dark:bg-primary' : ''
                )}
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                  if (active === item.id) {
                    setIsOpen(false);
                    setActive(null);
                    return;
                  }
                  setActive(item.id);
                }}
              >
                {item.title}
              </Button>
            ))}
            
            <Button
              className="ml-2 h-9 px-3 dark:bg-black dark:text-white"
              variant="default"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}