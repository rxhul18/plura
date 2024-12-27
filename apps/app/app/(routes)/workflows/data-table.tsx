"use client";

import * as React from "react";
// import exportFromJSON from "export-from-json"; 
import { List } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const handleDownload = async () => {
  //   const selectedRows = table.getSelectedRowModel().rows;
  //   const exportType = exportFromJSON.types.csv;

  //   // Get visible columns (excluding the select column)
  //   const visibleColumns = table
  //     .getAllColumns()
  //     .filter((column) => column.getIsVisible() && column.id !== "select")
  //     .map((column) => column.id);

  //   // Function to filter object properties based on visible columns
  //   const filterVisibleFields = (row: Record<string, unknown>) => {
  //     const filteredRow: Record<string, unknown> = {};
  //     visibleColumns.forEach((columnId) => {
  //       filteredRow[columnId] = row[columnId];
  //     });
  //     return filteredRow;
  //   };

  //   // If there are selected rows, download only those
  //   if (selectedRows && selectedRows.length > 0) {
  //     const selectedData = selectedRows
  //       .map((row) => row.original as Record<string, unknown>)
  //       .map(filterVisibleFields);

  //     exportFromJSON({
  //       data: selectedData,
  //       fileName: "SelectedMailsData",
  //       exportType,
  //     });
  //     return;
  //   }

  //   // If no rows are selected, download all data
  //   if (!data || data.length === 0) {
  //     return;
  //   }

  //   const filteredData = (data as Record<string, unknown>[]).map(
  //     filterVisibleFields,
  //   );
  //   exportFromJSON({
  //     data: filteredData,
  //     fileName: "AllMailsData",
  //     exportType,
  //   });
  // };

  return (
    <div>
      <div className="flex items-center py-4 w-full justify-between gap-2">
        <Input
          placeholder="Filter Workflows..."
          value={(table.getColumn("Workflow")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Workflow")?.setFilterValue(event.target.value)
          }
        />
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"outline"}>
                <List />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline-block">Download</span>
          </Button> */}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${
                        header.column.id === "Services"
                        ? "hidden md:table-cell"
                        : ""} ${header.column.id === "WorkflowId"
                        ? "hidden md:table-cell": ""}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        cell.column.id === "Services"
                        ? "hidden md:table-cell"
                        : ""} ${cell.column.id === "WorkflowId"
                        ? "hidden md:table-cell": ""}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
