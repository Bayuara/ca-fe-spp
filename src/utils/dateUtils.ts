export default function getMonthName(month: number): string {
  const monthName: { [key: number]: string } = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Desember",
  };

  if (!(month in monthName)) {
    throw new Error("Nomor bulan tidak valid");
  }

  return monthName[month];
}

interface dateFormatPayload {
  str?: string;
  locales?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
}

export function dateFormat(payload: dateFormatPayload) {
  const {
    str,
    locales = "id-ID",
    options = {
      month: "long",
      year: "numeric",
      day: "2-digit",
    },
  } = payload;
  if (!str) return "";

  const date = new Date(str);
  return new Intl.DateTimeFormat(locales, options).format(date);
}
