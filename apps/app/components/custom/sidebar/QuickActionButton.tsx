"use client";
import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const QuickActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        toggleOverlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full justify-between flex items-center font-semibold border text-center gap-x-1 text-sm leading-5 rounded-md py-1.5 h-8 px-2 shadow-10 hover:shadow-lg">
            <span className="flex items-center gap-x-1">
              <Zap />
              Quick Actions
            </span>

            <Badge
              variant="secondary"
              className="block px-2 py-0.5 rounded-md text-xs font-semibold hover:bg-secondary"
            >
              Ctrl + K{" "}
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sample Dialog Title</DialogTitle>
            <DialogDescription>Sample Dialog</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickActionButton;
