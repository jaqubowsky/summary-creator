function getFirstDayOfCurrentMonth() {
  const today = new Date();

  today.setDate(1);

  const firstDay = today.toISOString().slice(0, 10);
  return firstDay;
}

function getLastDayOfCurrentMonth() {
  const today = new Date();

  today.setMonth(today.getMonth() + 1, 1);
  today.setDate(today.getDate() - 1);

  const lastDay = today.toISOString().slice(0, 10);
  return lastDay;
}

export { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth };
