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

type StoreProvider = {
  providerData: any;
  handleProvider: (value: any) => void;
};
export const useStoreProvider = create<StoreProvider>((set) => ({
  providerData: null,
  handleProvider: (value) => {
    set({ providerData: value });
  },
}));

type ProviderDataPost<T = Record<string, any>> = {
  providerData: T;
  regionData: string;
  cloudProvider: string;
  setRegionData: (value: any) => void;
  setCloudProvider: (value: any) => void;
  saveProvider: (section: string, value: any) => void;
};
export const useProviderDataPost = create<ProviderDataPost>((set) => ({
  providerData: {} as Record<string, any>,
  regionData: "",
  setRegionData: (value) => {
    set({ regionData: value });
  },
  cloudProvider: "",
  setCloudProvider: (value: any) => {
    set({ cloudProvider: value });
  },
  saveProvider: (section, value) => {
    set((state) => {
      const updatedProviderData = {
        ...state.providerData,
        [section]: [...(state.providerData[section] || []), value],
      };

      return { providerData: updatedProviderData };
    });
  },
}));
