"use client";
import React from "react";
import { ColumnDef, DataTable } from "@/components/shared-ui/json-table";
import TableHeader from "./table-header";
import { Checkbox } from "@/components/ui/checkbox";
import useSWR from "swr";
import SaveNewOffer from "./save-new-offer";
import { Bug } from "lucide-react";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Offer {
  id: string;
  affiliate_network_name: string;
  status: string;
  reference_id: string;
  campaign_id: number;
  name: string;
  countries: string[];
  description: string;
  rules: string;
  expiration_date: string;
  type: string;
  payout: number;
  available_days: number;
  auto_sup: boolean;
  default_suppression_link: string;
  last_suppression_updated_date: string;
  created_at: string;
  updated_at: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function DataView() {
  const { data, error } = useSWR(
    `${process.env.API_URL}/api/v1/offer/get-cache-offers`,
    fetcher
  );

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: ColumnDef<Offer>[] = [
    {
      accessorKey: "checkbox",
      header: "",
      cell: () => (
        <div className="px-4">
          <Checkbox />
        </div>
      ),
    },

    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="  lowercase font-medium line-clamp-1">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "reference_id",
      header: "Reference ID",
      cell: ({ row }) => (
        <div className="  lowercase font-medium line-clamp-1">
          {row.getValue("reference_id")}
        </div>
      ),
    },
    {
      accessorKey: "campaign_id",
      header: "Campaign Id",
      cell: ({ row }) => {
        const campaign_id = row.getValue("campaign_id") as string;
        return <div className="">{campaign_id}</div>;
      },
    },
    {
      accessorKey: "affiliate_network_name",
      header: "Affiliate Network",
      cell: ({ row }) => (
        <span className="  lowercase font-medium line-clamp-1">
          {row.getValue("affiliate_network_name")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div
            className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(
              status
            )}`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "payout",
      header: "Payout",
      cell: ({ row }) => {
        const payout = row.getValue("payout") as string;
        return <div className="">{payout}$</div>;
      },
    },

    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className=" flex gap-x-2 justify-start items-end">
          <SaveNewOffer offer={row.original} />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Bug
                  className=" text-gray-600 hover:text-red-500 transition-all ease-in-out duration-300"
                  size={17}
                />
              </TooltipTrigger>
              <TooltipContent className="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
                report bug
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

  const tableConfig = {
    enableSearch: true,
    enableColumnFilters: true,
    enablePagination: true,
    pageSize: 10,
    searchPlaceholder: "Search offers...",
    customStyles: {
      table: "",
      row: "hover:transparent",
      cell: "py-3",
    },
  };

  const searchConfig = {
    searchableColumns: ["name", "status"],
  };

  return (
    <>
      {data?.data && (
        <DataTable<Offer>
          data={data.data}
          columns={columns}
          tableConfig={tableConfig}
          searchConfig={searchConfig}
          headerContent={<TableHeader />}
          onRowClick={(row) => console.log("Clicked row:", row)}
        />
      )}
    </>
  );
}

export default DataView;
