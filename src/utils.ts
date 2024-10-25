import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchUsers(page = 1) {
  const { data } = await axios.get(
    `https://randomuser.me/api/?inc=login,name,location,email,phone,picture&page=${page}&results=3&seed=abc`,
  );
  const hasMore = data.results.length !== 0;
  return { ...data, hasMore };
}

export const FALLBACK_COLOR = "#fff";

export const validHex = (value: string): boolean => {
  const match = /^#?([0-9A-F]{3,8})$/i.exec(value);
  const length = match ? match[1].length : 0;
  return length === 3 || length === 6 || length === 8;
};

export const prefix = (value: string) => (value.startsWith("#") ? value : `#${value}`);
