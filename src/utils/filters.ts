import moment from 'moment';

export const truncateString = (
  string: string,
  length = 100,
  append = '...'
) => {
  return string.length > length
    ? `${string.slice(0, length)}${append}`
    : string;
};

export const toQuery = (object: Record<string, string | number | null | undefined>) => {
  return Object.keys(object).map((key) => `${key}=${object[key]}`).join('&');
};

export const toReadableDate = (date: Date | string): string => {
  return moment(date).fromNow();
};

export const toSentenceCase = (string: string): string => {
  return string.replace(/^\w/, (char: string) => char.toUpperCase());
};
