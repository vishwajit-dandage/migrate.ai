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
import { useCloudProviderStore, useStoreProvider } from "@/store/app";
import axios from "axios";
import { headers } from "next/headers";
import { useEffect, useState } from "react";
import { ProviderService } from "../../services/provider";
import { redirect } from "next/navigation";
type ObjectKey = keyof typeof ProviderDetailsPlaceholder;
export function Connect() {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const selectedProvider = useCloudProviderStore((state) => state.provider);
  const setProviderData = useStoreProvider((state) => state.handleProvider);
  const provider = selectedProvider as ObjectKey;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const encodedStringBtoA = btoa(`${key}:${secret}`);

  // const { data: providerData, isLoading } = useQueryCloudProvider(
  //   encodedStringBtoA,
  //   selectedProvider
  // );

  const handleMigrateData = () => {
    setIsLoading(true);
    const providerData = ProviderService.getConnectionToProvider(
      encodedStringBtoA,
      selectedProvider
    );
    if (providerData) {
      setProviderData(providerData);
      redirect("/");
    }
    setIsLoading(false);
  };

  useEffect(() => {});
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">List Resources</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Connect to <span className=" uppercase">{selectedProvider}</span>
          </DialogTitle>
          <DialogDescription>
            Provide related information for connection to preferred cloud.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {ProviderDetailsPlaceholder[provider].key}
            </Label>
            <Input
              id="userid"
              className="col-span-3"
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              {ProviderDetailsPlaceholder[provider].secret}
            </Label>
            <Input
              id="userkey"
              className="col-span-3"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleMigrateData}>
            {isLoading ? "Connecting...." : "Connect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
