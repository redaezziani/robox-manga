import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Trash } from "lucide-react";
import { Button } from '@/components/ui/button';
const TableHeader = () => {
  return (
    <div className=" mt-2 flex justify-between items-end">
    <div className="flex gap-x-3 w-full justify-start items-center ">
      <span className=" w-36">
        <Select defaultValue="s1">
          <SelectTrigger id="select-19">
            <SelectValue placeholder="Select Limite" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="s1">10</SelectItem>
            <SelectItem value="s2">20</SelectItem>
            <SelectItem value="s3">30</SelectItem>
          </SelectContent>
        </Select>
      </span>

      <span className=" w-36">
        <Select defaultValue="s1">
          <SelectTrigger id="select-19">
            <SelectValue placeholder="Select Sort type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="s1">Id</SelectItem>
            <SelectItem value="s2">Name</SelectItem>
            <SelectItem value="s3">Date</SelectItem>
          </SelectContent>
        </Select>
      </span>

     

      <Button
      
      className=" flex gap-x-2 justify-center items-center">
        {" "}
        <Filter size={16} /> fillter
      </Button>

      <Button
        variant={"destructive"}
        className=" flex gap-x-2 justify-center items-center"
      >
        {" "}
        <Trash size={16} /> delete selected
      </Button>
    </div>

   
  </div>
  )
}

export default TableHeader