import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "@/lib/date/date";
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
    const startOfDay = new Date(date);
    startOfDay.setHours(2, 0, 0, 0);
    set({ startDate: startOfDay });
  },
  setEndDate: (date) => {
    const endOfDay = new Date(date);
    endOfDay.setHours(24, 59, 59, 999);
    set({ endDate: endOfDay });
  },
}));

export { useDateStore };
