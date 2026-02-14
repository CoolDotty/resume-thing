export const joinNonEmpty = (
  values: Array<string | null | undefined>,
  separator: string
): string => values.filter((value) => Boolean(value && value.trim())).join(separator);

export const formatMonthYear = (value: string): string => {
  if (!value.trim()) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = formatMonthYear(startDate);
  const end = formatMonthYear(endDate);

  if (start && end) {
    return `${start} - ${end}`;
  }

  return start || end;
};
