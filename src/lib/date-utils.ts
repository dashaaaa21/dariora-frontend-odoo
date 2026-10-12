/**
 * Date manipulation utilities
 */

export function formatDate(date: Date | string, format: string = 'DD/MM/YYYY'): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const replacements: Record<string, string> = {
    YYYY: String(year),
    MM: month,
    DD: day,
    HH: hours,
    mm: minutes,
  };

  return format.replace(/YYYY|MM|DD|HH|mm/g, (match) => replacements[match]);
}

export function isDateBefore(date1: Date | string, date2: Date | string): boolean {
  return new Date(date1) < new Date(date2);
}

export function isDateAfter(date1: Date | string, date2: Date | string): boolean {
  return new Date(date1) > new Date(date2);
}

export function addDays(date: Date | string, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDaysDifference(date1: Date | string, date2: Date | string): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
}
