"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  return (
    <TooltipProvider>
      <div className="flex gap-0.5 h-8 items-end mt-2 rounded-2xl cursor-pointer">
        {data.map((item, index) => {
          const date = new Date(item?.timestamp);

          const dateFormatter = new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          });

          console.log("dateFormatter :", dateFormatter?.format(date));

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={`w-2 ${getStatusColor(item.status)} cursor-pointer h-full`}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-card">
                <p className="capitalize text-card-foreground">
                  {item?.status}
                </p>
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
