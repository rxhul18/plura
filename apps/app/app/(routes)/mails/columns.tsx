"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type Mail = {
  id: string;
  Email: string;
  Source: string;
  date: string;
};

export const columns: ColumnDef<Mail>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent p-0"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Source",
    header: "Source",
    // className: "hidden md:table-cell",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent px-0"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      const [day, month, year] = date.split("-");

      // Convert month number to month name
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthName = monthNames[parseInt(month) - 1];

      const formatted = `${day}-${monthName}-${year}`;

      return <div>{formatted}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const dateA = rowA.getValue("date") as string;
      const dateB = rowB.getValue("date") as string;

      // Convert DD-MM-YYYY to YYYY-MM-DD for proper date comparison
      const [dayA, monthA, yearA] = dateA.split("-");
      const [dayB, monthB, yearB] = dateB.split("-");

      const formattedDateA = `${yearA}-${monthA.padStart(2, "0")}-${dayA.padStart(2, "0")}`;
      const formattedDateB = `${yearB}-${monthB.padStart(2, "0")}-${dayB.padStart(2, "0")}`;

      return formattedDateA.localeCompare(formattedDateB);
    },
  },
];
