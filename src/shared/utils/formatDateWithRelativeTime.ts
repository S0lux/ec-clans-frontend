import { format, formatDistance, parseISO } from "date-fns";

export function formatDateWithRelativeTime(dateString: string) {
  const parsedDate = parseISO(dateString);
  const formattedDate = format(parsedDate, "dd/MM/yyyy");
  const relativeTime = formatDistance(parsedDate, new Date(), {
    addSuffix: true,
  });

  return `${formattedDate} (${relativeTime})`;
}
