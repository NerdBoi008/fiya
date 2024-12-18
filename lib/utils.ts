import { QueryParams } from "@/types/index.types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildUrl<T extends QueryParams>(
  url: string,
  queryParams: T,
): string {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      searchParams.append(key, value);
    }
  }

  return `${url}?${searchParams.toString()}`
}


