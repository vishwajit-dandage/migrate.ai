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
import { useCloudProviderStore } from "@/store/app";
type ObjectKey = keyof typeof ProviderDetailsPlaceholder;
export function Connect() {
  const selectedProvider = useCloudProviderStore((state) => state.provider);
  const provider = selectedProvider as ObjectKey;
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
            <Input id="userid" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
            {ProviderDetailsPlaceholder[provider].secret}
            </Label>
            <Input id="userkey" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
