export function timeAgo(timestamp: string): { relative: string; date: string } {
  const now = Date.now();
  const parsedTimestamp = new Date(timestamp).getTime(); // Automatically handles time zone
  const diff = now - parsedTimestamp;

  const units: [string, number][] = [
    ["year", 365 * 24 * 60 * 60 * 1000],
    ["month", 30 * 24 * 60 * 60 * 1000],
    ["week", 7 * 24 * 60 * 60 * 1000],
    ["day", 24 * 60 * 60 * 1000],
    ["hour", 60 * 60 * 1000],
    ["min", 60 * 1000],
    ["sec", 1000],
  ];

  let relativeTime = "just now";
  for (const [unit, value] of units) {
    const amount = Math.floor(diff / value);
    if (amount >= 1) {
      relativeTime = `${amount} ${unit}${amount !== 1 ? "s" : ""} ago`;
      break;
    }
  }

  // Format date string
  const date = new Date(timestamp).toLocaleString(); // Converts to local date/time string

  return { relative: relativeTime, date: date };
}
