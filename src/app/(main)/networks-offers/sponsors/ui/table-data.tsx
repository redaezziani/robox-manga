import { ColumnDef, DataTable } from "@/components/shared-ui/json-table";
import { Button } from "@/components/ui/button";
import TableHeader from "./sponsors/table-header";
import { Checkbox } from "@/components/ui/checkbox";

interface DataType {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}
const data: DataType[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    createdAt: "2024-02-15",
  },
  {
    id: 3,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Viewer",
    createdAt: "2024-03-10",
  },
  {
    id: 4,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Admin",
    createdAt: "2024-04-20",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    role: "Editor",
    createdAt: "2024-05-05",
  },
  {
    id: 6,
    name: "Emily Clark",
    email: "emily.clark@example.com",
    role: "Viewer",
    createdAt: "2024-06-18",
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "Admin",
    createdAt: "2024-07-09",
  },
  {
    id: 8,
    name: "Sophia Moore",
    email: "sophia.moore@example.com",
    role: "Editor",
    createdAt: "2024-08-12",
  },
  {
    id: 9,
    name: "Liam Taylor",
    email: "liam.taylor@example.com",
    role: "Viewer",
    createdAt: "2024-09-14",
  },
  {
    id: 10,
    name: "Mia Anderson",
    email: "mia.anderson@example.com",
    role: "Admin",
    createdAt: "2024-10-01",
  },
  {
    id: 11,
    name: "Ethan Thomas",
    email: "ethan.thomas@example.com",
    role: "Editor",
    createdAt: "2024-11-05",
  },
  {
    id: 12,
    name: "Isabella Harris",
    email: "isabella.harris@example.com",
    role: "Viewer",
    createdAt: "2024-12-08",
  },
  {
    id: 13,
    name: "James Martin",
    email: "james.martin@example.com",
    role: "Admin",
    createdAt: "2025-01-20",
  },
  {
    id: 14,
    name: "Olivia Lee",
    email: "olivia.lee@example.com",
    role: "Editor",
    createdAt: "2025-02-10",
  },
  {
    id: 15,
    name: "Ava Walker",
    email: "ava.walker@example.com",
    role: "Viewer",
    createdAt: "2025-03-15",
  },
  {
    id: 16,
    name: "Noah Scott",
    email: "noah.scott@example.com",
    role: "Admin",
    createdAt: "2025-04-01",
  },
  {
    id: 17,
    name: "Lily Hall",
    email: "lily.hall@example.com",
    role: "Editor",
    createdAt: "2025-05-12",
  },
  {
    id: 18,
    name: "Mason Carter",
    email: "mason.carter@example.com",
    role: "Viewer",
    createdAt: "2025-06-08",
  },
  {
    id: 19,
    name: "Ella Brooks",
    email: "ella.brooks@example.com",
    role: "Admin",
    createdAt: "2025-07-19",
  },
  {
    id: 20,
    name: "Lucas Mitchell",
    email: "lucas.mitchell@example.com",
    role: "Editor",
    createdAt: "2025-08-25",
  },
  {
    id: 21,
    name: "Zoe Ramirez",
    email: "zoe.ramirez@example.com",
    role: "Viewer",
    createdAt: "2025-09-10",
  },
  {
    id: 22,
    name: "Jack Rivera",
    email: "jack.rivera@example.com",
    role: "Admin",
    createdAt: "2025-10-03",
  },
  {
    id: 23,
    name: "Amelia Hughes",
    email: "amelia.hughes@example.com",
    role: "Editor",
    createdAt: "2025-11-15",
  },
  {
    id: 24,
    name: "Henry Perry",
    email: "henry.perry@example.com",
    role: "Viewer",
    createdAt: "2025-12-20",
  },
  {
    id: 25,
    name: "Grace Foster",
    email: "grace.foster@example.com",
    role: "Admin",
    createdAt: "2026-01-14",
  },
  {
    id: 26,
    name: "Samuel Bailey",
    email: "samuel.bailey@example.com",
    role: "Editor",
    createdAt: "2026-02-28",
  },
  {
    id: 27,
    name: "Victoria Cox",
    email: "victoria.cox@example.com",
    role: "Viewer",
    createdAt: "2026-03-09",
  },
  {
    id: 28,
    name: "Oliver Ward",
    email: "oliver.ward@example.com",
    role: "Admin",
    createdAt: "2026-04-11",
  },
  {
    id: 29,
    name: "Sofia Howard",
    email: "sofia.howard@example.com",
    role: "Editor",
    createdAt: "2026-05-20",
  },
  {
    id: 30,
    name: "Aiden Cooper",
    email: "aiden.cooper@example.com",
    role: "Viewer",
    createdAt: "2026-06-18",
  },
];

function DataView() {
  const columns: ColumnDef<DataType>[] = [
    {
        accessorKey: "checkbox",
        header: "",
        cell: ({ row }) => <div className="px-4">
            <Checkbox/>
        </div>,
      },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="px-4">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;

        return <div className={`px-2 py-1 rounded  `}>{role}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
    },
  ];

  const tableConfig = {
    enableSearch: true,
    enableColumnFilters: true,
    enablePagination: true,
    pageSize: 9,
    searchPlaceholder: "Search users...",
    customStyles: {
      table: "shadow-sm",
      row: "hover:bg-slate-50",
      cell: "py-3",
    },
  };

  const searchConfig = {
    searchableColumns: ["name", "email", "role"],
  };

  return (
    <DataTable<DataType>
      data={data}
      columns={columns}
      tableConfig={tableConfig}
      searchConfig={searchConfig}
      headerContent={<TableHeader />}
      onRowClick={(row) => console.log("Clicked row:", row)}
    />
  );
}

export default DataView;
