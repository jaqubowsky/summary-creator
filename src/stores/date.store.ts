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
    const endOfMonth = new Date(startOfDay.getFullYear(), startOfDay.getMonth() + 1, 0);
    endOfMonth.setHours(24, 59, 59, 999);
    set({ startDate: startOfDay, endDate: endOfMonth });
  },
  setEndDate: (date) => {
    const endOfDay = new Date(date);
    endOfDay.setHours(24, 59, 59, 999);
    set({ endDate: endOfDay });
  },
}));

export { useDateStore };
