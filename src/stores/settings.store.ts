import { create } from "zustand";

interface SettingsStore {
  product: string;
  category: string;
  client: string;
  setProduct: (product: string) => void;
  setCategory: (category: string) => void;
  setClient: (client: string) => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
  product: "",
  category: "",
  client: "",
  setProduct: (product) => set({ product }),
  setCategory: (category) => set({ category }),
  setClient: (client) => set({ client }),
}));

export { useSettingsStore };
