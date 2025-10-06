export const formatCurrency = (amount: number) => {
  return (amount / 100).toFixed(3) + " kr";
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
    ? `+${percentageChange.toFixed(3)}%`
    : `${percentageChange.toFixed(3)}%`;
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
