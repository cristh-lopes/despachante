import React from "react";
import { Column } from "@/models/Column";

export interface TableProps<T> {
  columns: Column<T, keyof T>[];
  data: T[];
  whoIsKey: keyof T;
}

export default function Table<T>({ columns, data, whoIsKey }: TableProps<T>) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">Ações</th>
          {columns.map((column) => (
            <th key={String(column.key)} className="border border-gray-300 p-2">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={String(item[whoIsKey])} className="border border-gray-300">
            <td className="border border-gray-300 p-2">-</td>
            {columns.map((column) => (
              <td key={String(column.key)} className="border border-gray-300 p-2">
                {column.format ? column.format(item) : String(item[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}