import {
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "@/lib/date/date";
import { create } from "zustand";

interface DateStore {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const useDateStore = create<DateStore>((set) => ({
  startDate: getFirstDayOfCurrentMonth(),
  endDate: getLastDayOfCurrentMonth(),
  setStartDate: (date) => {
    set({ startDate: date });
  },
  setEndDate: (date) => {
    set({ endDate: date });
  },
}));

export { useDateStore };
