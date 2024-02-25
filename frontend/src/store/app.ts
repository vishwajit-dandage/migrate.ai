import { create } from "zustand";

type CloudProviderStore = {
  provider: string;
  targetProvider: string;
  handleProvider: (value: string) => void;
  handleTargetProvider: (value: string) => void;
};

export const useCloudProviderStore = create<CloudProviderStore>((set) => ({
  provider: "aws",
  targetProvider: "gcp",
  handleProvider: (value) => {
    set({ provider: value });
  },
  handleTargetProvider: (value) => {
    set({ targetProvider: value });
  },
}));

type StoreProvider = {
  targetCredData: any;
  providerData: any;
  handleProvider: (value: any) => void;
  setTargetCredData: (value: any) => void;
};
export const useStoreProvider = create<StoreProvider>((set) => ({
  providerData: null,
  targetCredData: null,
  handleProvider: (value) => {
    set({ providerData: value });
  },
  setTargetCredData: (value) => {
    set({ targetCredData: value });
  },
}));

type ProviderDataPost<T = Record<string, any>> = {
  providerData: T;
  regionData: string;
  cloudProvider: string;

  setRegionData: (value: any) => void;
  setCloudProvider: (value: any) => void;
  saveProvider: (
    provider: string,
    region: string,
    section: string,
    value: any
  ) => void;
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
  saveProvider: (provider, region, section, value) => {
    set((state) => {
      const updatedProviderData = {
        ...state.providerData,
        [provider]: {
          ...state.providerData[provider],
          [region]: {
            ...state.providerData[provider]?.[region],
            [section]: [
              ...(state.providerData[provider]?.[region]?.[section] || []),
              value,
            ],
          },
        },
      };

      return { providerData: updatedProviderData };
    });
  },
}));

type Disabled = {
  disabled: boolean;
  setDisabled: (value: boolean) => void;
};

export const useDisabled = create<Disabled>((set) => ({
  disabled: true,
  setDisabled: (value) => {
    set({ disabled: value });
  },
}));

type MigrationStatus = {
  status: boolean;
  setStatus: (value: boolean) => void;
};

export const useMigrationStatus = create<MigrationStatus>((set) => ({
  status: false,
  setStatus: (value) => {
    set({ status: value });
  },
}));
