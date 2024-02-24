"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCloudProviderStore } from "@/store/app";
import React, { useState } from "react";

const DropDownComp = () => {
  const handleValueChange = useCloudProviderStore((state) => state.handleProvider);

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select source cloud" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="aws">AWS</SelectItem>
        <SelectItem value="azure">Azure</SelectItem>
        <SelectItem value="gcp">GCP</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DropDownComp;
