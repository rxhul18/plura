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


// Menu items.
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
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
            <div className="flex-grow">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2 p-2 hover:bg-gray-100">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Select Service
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto">
                  {services.map((service) => (
                    <DropdownMenuItem key={service.value}>
                      {service.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
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