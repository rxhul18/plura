"use client";
import { useState, useEffect, useRef } from "react";
import { Bot, Brain, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DraggableNode } from "./draggable-node";
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';
import useClickOutside from '@/hooks/useClickOutside';

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
};

const TOOLBAR_ITEMS = [
  {
    id: 'agent',
    label: 'Agent',
    title: <Bot className="h-5 w-5" />,
    type: "agentNode",
  },
  {
    id: 'memory',
    label: 'Memory',
    title: <Brain className="h-5 w-5" />,
    type: "memoryNode",
  },
  {
    id: 'services',
    label: 'Services',
    title: <Workflow className="h-5 w-5" />,
    type: "searchSelect",
    subItems: ['service1', 'service2', 'service3', 'service4']
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
                  style={{ width: maxWidth }}
                >
                  <div ref={contentRef} className="p-2">
                    {TOOLBAR_ITEMS.map((item) => {
                      const isSelected = active === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className={cn('px-2 pt-2', isSelected ? 'block' : 'hidden')}>
                            {item.id === 'services' ? (
                              <div className="flex flex-wrap gap-2">
                                {item.subItems?.map((serviceId) => (
                                  !usedNodes.has(serviceId) && (
                                    <DraggableNode
                                      key={serviceId}
                                      type={item.type}
                                      label="Node"
                                      id={serviceId}
                                      onDrop={handleNodeDrop}
                                    />
                                  )
                                ))}
                              </div>
                            ) : (
                              !usedNodes.has(item.id) && (
                                <DraggableNode
                                  type={item.type}
                                  label="Node"
                                  id={item.id}
                                  onDrop={handleNodeDrop}
                                />
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