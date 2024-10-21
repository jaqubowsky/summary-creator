import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  formatDateToString,
  formatStringToDate,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "./date";

describe("Date Utility Functions", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("getFirstDayOfCurrentMonth should return the first day of the current month", () => {
    const today = new Date();

    const firstDay = getFirstDayOfCurrentMonth();
    expect(firstDay.getFullYear()).toBe(today.getFullYear());
    expect(firstDay.getMonth()).toBe(today.getMonth());
    expect(firstDay.getDate()).toBe(1);
  });

  it("getLastDayOfCurrentMonth should return the last day of the current month", () => {
    const today = new Date();

    const lastDay = getLastDayOfCurrentMonth();
    const expectedLastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );
    expect(lastDay.getFullYear()).toBe(expectedLastDay.getFullYear());
    expect(lastDay.getMonth()).toBe(expectedLastDay.getMonth());
    expect(lastDay.getDate()).toBe(expectedLastDay.getDate());
  });

  it("formatStringToDate should convert a date string to a Date object", () => {
    const dateString = "2023-10-01";
    const date = formatStringToDate(dateString);
    expect(date.getFullYear()).toBe(2023);
    expect(date.getMonth()).toBe(9);
    expect(date.getDate()).toBe(1);
  });

  it("formatDateToString should convert a Date object to a string in YYYY-MM-DD format", () => {
    const date = new Date("2023-10-01");

    const dateString = formatDateToString(date);
    expect(dateString).toBe("2023-10-01");
  });

  it("formatDateToString should return an empty string for an invalid date", () => {
    const invalidDate = new Date("invalid-date");
    const dateString = formatDateToString(invalidDate);
    expect(dateString).toBe("");
  });
});
