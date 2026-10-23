const MONTHS: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

/** "May 2026" / "Sept 2024" -> "2026-05" / "2024-09" for <time dateTime>. Returns undefined for "Present". */
export function toIsoMonth(value: string): string | undefined {
  const match = value.trim().match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
  if (!match) return /^\d{4}$/.test(value.trim()) ? value.trim() : undefined;
  const month = MONTHS[match[1].slice(0, 3).toLowerCase()];
  return month ? `${match[2]}-${month}` : undefined;
}
