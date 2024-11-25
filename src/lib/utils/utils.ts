import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isNumeric = (value: unknown) => {
  if (typeof value != "string") return false;
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
};

export const parseResponseObject = (object = {}): any => {
  return Object.entries(object).reduce(
    (previousValue, [key, value]) => {
      const newValue =
        typeof value === "string" && isNumeric(value)
          ? parseFloat(value)
          : value;
      return {
        ...previousValue,
        [key]: newValue,
      };
    },
    { ...object },
  );
};

export function formatCurrency(num: unknown): string {
  if (typeof num === "undefined" || num === null) return "-";
  if (typeof num === "string" && !isNumeric(num)) return num;
  if (typeof num === "number") return num.toFixed(2);
  return "-";
}

export function formatPercentage(num: unknown): string {
  if (typeof num === "undefined" || num === null) return "-";
  if (typeof num === "string" && !isNumeric(num)) return num;
  if (typeof num === "number") return `${(num * 100).toFixed(2)}%`;
  return "-";
}
