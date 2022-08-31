/*
 * Copyright (c) 2022 Oliver Ni
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { ColumnDef, RowData, Table, TableState } from "@tanstack/react-table";

import { CheckIcon } from "@heroicons/react/20/solid";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import Dropdown from "./dropdown";

type TableProps<T extends RowData> = { table: Table<T> };

function FieldSelector<T extends RowData>({ table }: TableProps<T>) {
  return (
    <div className="sm:flex sm:justify-end">
      <Dropdown>
        <Dropdown.Button>Fields</Dropdown.Button>
        <Dropdown.Items>
          {table.getAllLeafColumns().map((x) => (
            <Dropdown.Item
              key={x.id}
              className="group flex items-center"
              onClick={x.getToggleVisibilityHandler()}
            >
              {x.getIsVisible() ? (
                <CheckIcon className="-ml-1 mr-3 h-4 w-4" />
              ) : (
                <div className="-ml-1 mr-3 h-4 w-4" />
              )}
              {typeof x.columnDef.header === "string" ? x.columnDef.header : x.id}
            </Dropdown.Item>
          ))}
        </Dropdown.Items>
      </Dropdown>
    </div>
  );
}

function Headers<T extends RowData>({ table }: TableProps<T>) {
  return (
    <thead className="bg-gray-50">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="divide-x divide-gray-200">
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-900"
              colSpan={header.colSpan}
              scope="col"
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

function Body<T extends RowData>({ table }: TableProps<T>) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id} className="divide-x divide-gray-200">
          {row.getVisibleCells().map((cell) => (
            <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-500" key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

type DataTableProps<T extends RowData> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  initialState?: Partial<TableState>;
};

export default function DataTable<T extends RowData>({
  data,
  columns,
  initialState,
}: DataTableProps<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    initialState,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-stretch gap-4">
      <FieldSelector table={table} />

      <div className="overflow-auto rounded-lg shadow ring-1 ring-black ring-opacity-5">
        <table className="min-w-full divide-y divide-gray-300">
          <Headers table={table} />
          <Body table={table} />
        </table>
      </div>
    </div>
  );
}
