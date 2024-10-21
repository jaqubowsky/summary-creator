function getFirstDayOfCurrentMonth() {
  const today = new Date();

  today.setDate(1);

  return today;
}

function getLastDayOfCurrentMonth() {
  const today = new Date();

  today.setMonth(today.getMonth() + 1, 1);
  today.setDate(today.getDate() - 1);

  return today;
}

function formatStringToDate(dateString: string) {
  return new Date(dateString);
}

function formatDateToString(date: Date) {
  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}

export {
  formatDateToString,
  formatStringToDate,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
};
