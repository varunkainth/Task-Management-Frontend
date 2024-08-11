// src/utils/dateUtils.ts
import { format, parseISO } from 'date-fns';

// Format a date to 'yyyy-MM-dd'
export const formatDate = (date: Date | string) => {
  return format(parseISO(date.toString()), 'yyyy-MM-dd');
};

// Parse a date string to Date object
export const parseDate = (dateString: string) => {
  return parseISO(dateString);
};
