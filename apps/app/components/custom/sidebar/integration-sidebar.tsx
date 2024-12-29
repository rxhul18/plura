"use client";
import { useState, useEffect, useRef } from "react";
import { Bot, Brain, Workflow, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';
import useClickOutside from '@/hooks/useClickOutside';
import { AgentDragableNode } from "./agent-dragable-node";
import { MemoryDragableNode } from "./memory-dragable-node";
import { ServiceNode, services } from '../nodes/services-node';
import { ServiceDragableNode } from "./service-dragable-node";

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
};

const TOOLBAR_ITEMS = [
  {
    id: 'agent',
    label: 'Agent',
    title: <Bot className="h-4 w-4 sm:h-5 sm:w-5" />,
    type: "agentNode",
  },
  {
    id: 'memory',
    label: 'Memory',
    title: <Brain className="h-4 w-4 sm:h-5 sm:w-5" />,
    type: "memoryNode",
  },
  {
    id: 'services',
    label: 'Services',
    title: <Workflow className="h-4 w-4 sm:h-5 sm:w-5" />,
    type: "serviceNode",
    subItems: services.map(service => service.id)
  }
];

export function IntegrationToolbar({ deletedNodeIds = [] }: { deletedNodeIds?: string[] }) {
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

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;
    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

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
                          <div className={cn('', isSelected ? 'block' : 'hidden')}>
                            {item.id === 'services' && (
                              <div className="flex flex-col gap-2 p-2">
                                <div className="relative">
                                  <input
                                    type="text"
                                    placeholder="Search services..."
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                  />
                                  <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
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
                            {item.id === 'agent' && (
                              !usedNodes.has(item.id) && (
                                <div className="p-2">
                                  <AgentDragableNode
                                    type={item.type}
                                    label="Node"
                                    id={item.id}
                                    onDrop={handleNodeDrop}
                                    data={{ label: item.label }}
                                  />
                                </div>
                              )
                            )}
                            {item.id === 'memory' && (
                              !usedNodes.has(item.id) && (
                                <div className="p-2">
                                  <MemoryDragableNode
                                    type={item.type}
                                    label="Node"
                                    id={item.id}
                                    onDrop={handleNodeDrop}
                                    data={{ label: item.label }}
                                  />
                                </div>
                              )
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
                variant={active === item.id ? 'default' : 'ghost'}
                aria-label={item.label}
                className={cn(
                  'relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]',
                  // active === item.id ? 'bg-primary' : ''
                )}
                // type="button"
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
              className="ml-2 h-9 px-3"
              variant="default"
              onClick={() => console.log("Submitted")}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}