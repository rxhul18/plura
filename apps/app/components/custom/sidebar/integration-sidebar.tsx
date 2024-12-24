"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DraggableNode } from "./draggable-node";


// Menu items.
const items = [
  { title: "Agent", url: "#", icon: Home },
  { title: "Memory", url: "#", icon: Inbox },
];

const services = [
  { name: "Email Service", value: "email" },
  { name: "SMS Gateway", value: "sms" },
  { name: "Payment Gateway", value: "payment" },
  { name: "Cloud Storage", value: "storage" },
  { name: "Analytics", value: "analytics" },
]

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Sidebar side="right" collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <main>
            <SidebarTrigger />
          </main>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent className="mt-5 flex flex-col h-screen">
            <aside>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Agent</h3>
                <DraggableNode type="searchSelect" label="Search & Select Node" />
                {/* <DraggableNode type="input" label="Input Node" />
                <DraggableNode type="output" label="Output Node" /> */}
              </div>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Memory</h3>
                <DraggableNode type="searchSelect" label="Search & Select Node" />
              </div>
              <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Services</h3>
                <DraggableNode type="searchSelect" label="Search & Select Node" />
                <DraggableNode type="searchSelect" label="Search & Select Node" />
                <DraggableNode type="searchSelect" label="Search & Select Node" />
                <DraggableNode type="searchSelect" label="Search & Select Node" />
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