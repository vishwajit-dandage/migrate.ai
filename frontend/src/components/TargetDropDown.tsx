"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCloudProviderStore } from "@/store/app";

const TargetDropDown = () => {
  const handleValueChange = useCloudProviderStore(
    (state) => state.handleProvider
  );

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select source cloud"/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="gcp">GCP</SelectItem>
        {/* <SelectItem value="aws">On Premise</SelectItem> */}
      </SelectContent>
    </Select>
  );
};

export default TargetDropDown;
