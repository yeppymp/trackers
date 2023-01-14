import { format } from 'date-fns';

export const formatDateTime = (value: string): string => {
  const date = new Date(value);

  if (!date) return '';

  const pattern = 'dd MMM yyyy hh:mm';

  return format(date, pattern);
};
