export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("sv-SE", {
    style: "currency",
    currency: "SEK",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "sv-SE"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Add this line to include day of the week
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const getPercentageChange = (entry: number, exit: number) => {
  if (entry === 0 || exit === 0) return 0; // Prevent division by zero
  return ((exit - entry) / entry) * 100;
};

export const getPercentageChangeWithSign = (entry: number, exit: number) => {
  const percentageChange = getPercentageChange(entry, exit);
  return percentageChange >= 0
    ? `+${percentageChange.toFixed(2)}%`
    : `${percentageChange.toFixed(2)}%`;
};
