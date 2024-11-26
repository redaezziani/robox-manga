import React from "react";
import { ColumnDef, DataTable } from "@/components/shared-ui/json-table";

interface DataType {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const data: DataType[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", createdAt: "2024-01-01" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor", createdAt: "2024-02-15" },
  { id: 3, name: "Alice Brown", email: "alice.brown@example.com", role: "Viewer", createdAt: "2024-03-10" },
  { id: 4, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Admin", createdAt: "2024-04-20" },
  { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", role: "Editor", createdAt: "2024-05-05" },
  { id: 6, name: "Emily Clark", email: "emily.clark@example.com", role: "Viewer", createdAt: "2024-06-18" },
];

function Data() {
  const columns: ColumnDef<DataType>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="px-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="px-4 rounde border border-slate-300"> {row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div
          className={`px-2 py-1 rounded text-white ${
            row.getValue("role") === "Admin" ? "bg-red-500" : row.getValue("role") === "Editor" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          {row.getValue("role")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => <div className="px-4">{row.getValue("createdAt")}</div>,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Testing DataTable</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default Data;
