"use client"
import React, { useEffect, useState } from 'react';
import { ColumnDef, DataTable } from "@/components/shared-ui/json-table";
import { Button } from "@/components/ui/button";
import TableHeader from "./table-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import useSWR from 'swr'
import { Edit, Save, Trash } from 'lucide-react';
import { toast } from 'sonner';

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

const fetcher = (url: string) => fetch(url).then(res => res.json());

function DataView() {

  const { data, error } = useSWR('http://localhost:8000/api/v1/offer/get-cache-offers', fetcher);

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: ColumnDef<Offer>[] = [
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
        <div className=" text-gray-600 lowercase font-medium line-clamp-1">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "reference_id",
      header: "Reference ID",
      cell: ({ row }) => <div className=" text-gray-600 lowercase font-medium line-clamp-1">{row.getValue("reference_id")}</div>,
    },
    {
      accessorKey: "affiliate_network_name",
      header: "Affiliate Network",
      cell: ({ row }) => (
        <span className=" text-gray-600 lowercase font-medium line-clamp-1">
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
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(status)}`}>
            {status}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({row}) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <span className="sr-only">Edit</span>
            <Edit className=' text-gray-400' size={17}/>
          </Button>

          <Button
          onClick={() => handelSaveOffer(row.getValue("id"))} 
          variant="ghost" size="sm">
            <span className="sr-only">save to db </span>
            <Save className=' text-gray-400' size={17}/>
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
    searchPlaceholder: "Search offers...",
    customStyles: {
      table: "shadow-sm",
      row: "hover:bg-slate-50",
      cell: "py-3",
    },
  };

  const searchConfig = {
    searchableColumns: ["name", "status"],
  };


  const handelSaveOffer = async (id:string)=>{
    try {
        const response = await fetch(`http://localhost:8000/api/v1/offer/save-offer?cache_offer_id=${id}`)
        const data = await response.json()
        console.log(data)
        toast("Offer created successfully!", {
            description: "Your new offer has been added to the system.",
          });
          
    } catch (error) {
        
    }
  }

  return (
    <>
     {data?.data && <DataTable<Offer>
      data={data.data}
      columns={columns}
      tableConfig={tableConfig}
      searchConfig={searchConfig}
      headerContent={<TableHeader />}
      onRowClick={(row) => console.log("Clicked row:", row)}
    />}
    </>
   
  );
}

export default DataView;
