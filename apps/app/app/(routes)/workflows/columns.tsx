"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
// import { Checkbox } from "@/components/ui/checkbox";

export type Mail = {
    WorkflowId: string,
    Workflow: string,
    Status: "Running" | "Paused" | "Stopped",
    Services: string,
};

export const columns: ColumnDef<Mail>[] = [
    {
        accessorKey: "WorkflowId",
        header: "ID",
        cell: ({ row }) => {
            return <Link href={`/workflows/${row.getValue("WorkflowId")}`}>{row.getValue("WorkflowId")}</Link>;
        }
    },
    {
        accessorKey: "Workflow",
        header: "Workflows",
    },
    {
        accessorKey: "Status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <Badge variant={"outline"} className={`
            ${row.getValue("Status") === "Running" && " bg-emerald-500"}
            ${row.getValue("Status") === "Paused" && "bg-yellow-500"}
            ${row.getValue("Status") === "Stopped" && "bg-muted"}okhh
           `}>{row.getValue("Status")}</Badge>;
        },
    },
    {
        accessorKey: "Services",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-transparent p-0"
                >
                    Services
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
];
