"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Info, X } from "lucide-react";
import { Separator } from "../ui/separator";

export interface StatusData {
  status: "operational" | "degraded" | "down" | "warning";
  timestamp: string;
  latency: string;
}

interface StatusTrackerProps {
  data: StatusData[];
}

export default function StatusTracker({ data }: StatusTrackerProps) {
  const getStatusColor = (status: StatusData["status"]) => {
    switch (status) {
      case "operational":
        return "bg-emerald-500";
      case "degraded":
        return "bg-gray-400";
      case "down":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusIcon = (status: StatusData["status"]) => {
    switch (status) {
      case "operational":
        return (
          <Check className=" bg-emerald-500 rounded-full size-4 p-[2px] text-background" />
        );
      case "degraded":
        return (
          <Info className="bg-gray-400 rounded-full text-background size-4" />
        );
      case "down":
        return (
          <X className="bg-red-500 rounded-full text-background size-4 p-[2px] " />
        );
      case "warning":
        return (
          <Info className="bg-yellow-500 rounded-full text-background size-4" />
        );
      default:
        return (
          <Info className="bg-gray-300 rounded-full text-background size-4" />
        );
    }
  };

  return (
    <TooltipProvider>
      <div className="flex gap-0.5 h-8 items-end mt-2 rounded-2xl cursor-pointer">
        {data.map((item, index) => {
          const date = new Date(item?.timestamp);

          const dateFormatter = new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          });

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={`w-2 ${getStatusColor(item?.status)} cursor-pointer h-full`}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-card">
                <p className="capitalize text-card-foreground text-lg flex gap-2 py-2 font-bold justify-center items-center">
                  {getStatusIcon(item?.status)}
                  {item?.status}
                </p>

                <Separator className="mb-2" />

                <p className="text-xs text-muted-foreground">
                  {dateFormatter?.format(date)}
                </p>
                <p className="text-xs text-muted-foreground flex gap-1 items-center">
                  Latency: {item?.latency} ms
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
