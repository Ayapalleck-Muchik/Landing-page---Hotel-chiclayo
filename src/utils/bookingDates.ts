const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const addLocalDays = (date: Date, days: number): Date => {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
};

const toUtcDay = (value: string): number | null => {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;

  return Date.UTC(year, month - 1, day);
};

export const minimumCheckOutDate = (checkIn: string): string => {
  const [year, month, day] = checkIn.split('-').map(Number);
  const date = year && month && day ? new Date(year, month - 1, day) : new Date();
  return formatLocalDate(addLocalDays(date, 1));
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInUtc = toUtcDay(checkIn);
  const checkOutUtc = toUtcDay(checkOut);
  if (checkInUtc === null || checkOutUtc === null || checkOutUtc <= checkInUtc) return 0;

  return Math.round((checkOutUtc - checkInUtc) / DAY_IN_MS);
};

export const isValidStay = (checkIn: string, checkOut: string): boolean => {
  const today = formatLocalDate(new Date());
  return checkIn >= today && calculateNights(checkIn, checkOut) > 0;
};
