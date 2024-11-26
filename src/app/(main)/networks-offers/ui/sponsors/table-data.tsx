import React from 'react';
import { ColumnDef, DataTable } from "@/components/shared-ui/json-table";
import { Button } from "@/components/ui/button";
import TableHeader from "./table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface AffiliateNetwork {
  id: number;
  name: string;
  affiliateNumber: string;
  platform: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

const data: AffiliateNetwork[] = [
  {
    id: 1,
    name: "Lolaleads",
    affiliateNumber: "AF392847",
    platform: "cortex.cake",
    status: "Active",
  },
  {
    id: 2,
    name: "MaxBounty",
    affiliateNumber: "MB584937",
    platform: "maxbounty.com",
    status: "Active",
  },
  {
    id: 3,
    name: "ClickDealer",
    affiliateNumber: "CD738291",
    platform: "clickdealer.com",
    status: "Inactive",
  },
  {
    id: 4,
    name: "MobiFaster",
    affiliateNumber: "MF847362",
    platform: "mobifaster.com",
    status: "Active",
  },
  {
    id: 5,
    name: "AdCombo",
    affiliateNumber: "AC294857",
    platform: "adcombo.com",
    status: "Pending",
  },
  {
    id: 6,
    name: "PropellerAds",
    affiliateNumber: "PA583927",
    platform: "propellerads.com",
    status: "Active",
  },
  {
    id: 7,
    name: "TrafficCompany",
    affiliateNumber: "TC847593",
    platform: "trafficcompany.com",
    status: "Active",
  },
  {
    id: 8,
    name: "GlobalWide",
    affiliateNumber: "GW738492",
    platform: "globalwide.network",
    status: "Inactive",
  },
  {
    id: 9,
    name: "MobAds",
    affiliateNumber: "MA583927",
    platform: "mobads.com",
    status: "Active",
  },
  {
    id: 10,
    name: "AdsBridge",
    affiliateNumber: "AB294857",
    platform: "adsbridge.com",
    status: "Active",
  }
];

function DataView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: ColumnDef<AffiliateNetwork>[] = [
    {
      accessorKey: "checkbox",
      header: "",
      cell: () => <div className="px-4">
        <Checkbox />
      </div>,
    },
    {
      accessorKey: "id",
      header: "#",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "affiliateNumber",
      header: "Affiliate Number",
      cell: ({ row }) => <div className="px-4">{row.getValue("affiliateNumber")}</div>,
    },
    {
      accessorKey: "platform",
      header: "Platform",
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-normal">
          {row.getValue("platform")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(status)}`}>
            {status}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <span className="sr-only">Edit</span>
            ⚙️
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600">
            <span className="sr-only">Delete</span>
            🗑️
          </Button>
        </div>
      ),
    },
  ];

  const tableConfig = {
    enableSearch: true,
    enableColumnFilters: true,
    enablePagination: true,
    pageSize: 8,
    searchPlaceholder: "Search networks...",
    customStyles: {
      table: "shadow-sm",
      row: "hover:bg-slate-50",
      cell: "py-3",
    },
  };

  const searchConfig = {
    searchableColumns: ["name", "status"],
  };

  return (
    <DataTable<AffiliateNetwork>
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