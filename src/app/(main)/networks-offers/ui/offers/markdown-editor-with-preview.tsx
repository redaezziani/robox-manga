"use client";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Eye } from "lucide-react";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface MarkdownEditorWithPreviewProps {
  htmlContent: string;
}
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
};
const MarkdownEditorWithPreview: React.FC<MarkdownEditorWithPreviewProps> = ({
  htmlContent,
}) => {
  const [value, setValue] = useState("");

  return (
    <Tabs defaultValue="preview" className="w-full">
      <div className="flex w-full justify-between items-start ">
        <Label htmlFor="description">Description</Label>

        <TabsList>
          <TabsTrigger
            className=" !border-none !bg-transparent !shadow-none text-slate-400"
            value="preview"
          >
            <Eye size={14} />
          </TabsTrigger>
          <TabsTrigger
            className=" !border-none !bg-transparent !shadow-none text-slate-400"
            value="code"
          >
            <Code size={14} />
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="code">
        <ReactQuill
          className=" rounded-lg"
          value={htmlContent}
          onChange={setValue}
        />
      </TabsContent>
      <TabsContent value="preview">
        <div
          className="preview max-h-72"
          dangerouslySetInnerHTML={{
            __html: htmlContent,
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MarkdownEditorWithPreview;
