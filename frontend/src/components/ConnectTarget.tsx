"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderDetailsPlaceholder } from "@/constant/constant";
import { useQueryCloudProvider } from "@/hooks/useCloudProviderQuery";
import { useRouter } from "next/navigation";
import {
  useCloudProviderStore,
  useDisabled,
  useStoreProvider,
} from "@/store/app";
import axios from "axios";
import { headers } from "next/headers";
import { useEffect, useState } from "react";
import { ProviderService } from "../../services/provider";
import { redirect } from "next/navigation";
type ObjectKey = keyof typeof ProviderDetailsPlaceholder;
export function ConnectTarget() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [text, setText] = useState("");
  const [jsonData, setJsonData] = useState({});
  const { targetProvider } = useCloudProviderStore();
  const provider = targetProvider as ObjectKey;
  const { setTargetCredData } = useStoreProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setDisabled } = useDisabled();
  useStoreProvider;

  const handleSubmit = () => {
    setIsLoading(true);
    try {
    //   console.log("text", text);
    //   console.log("text", JSON.parse(JSON.stringify(text)));
      setTargetCredData(text);
      setOpen(false);
    } catch (error) {
      console.error("Invalid JSON format");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(typeof jsonData);
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Provide Credentials</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Connect to <span className=" uppercase">GCP</span>
          </DialogTitle>
          <DialogDescription>
            Provide related information for connection to preferred cloud.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {ProviderDetailsPlaceholder[provider].key}
            </Label>
            <textarea
              id="userid"
              className="col-span-3 w-[100%]"
              onChange={(e) => {
                setText(e.target.value);
              }}
              rows={10}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isLoading ? "Connecting...." : "Connect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
