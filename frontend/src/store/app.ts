import { create } from "zustand";

type CloudProviderStore = {
  provider: string;
  handleProvider: (value: string) => void;
};

export const useCloudProviderStore = create<CloudProviderStore>((set) => ({
  provider: "aws",  
  handleProvider: (value) => {
    set({ provider: value });
  },
}));
