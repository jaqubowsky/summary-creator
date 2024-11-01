import { create } from "zustand";

type States = "idle" | "fetching" | "generating" | "formatting";

interface StatesStore {
  state: States;
  setState: (state: States) => void;
}

const useStateStore = create<StatesStore>((set) => ({
  state: "idle",
  setState: (state) => set({ state }),
}));

export { useStateStore };
