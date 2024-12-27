import { User } from "@/types/index.types";

type CachedUser = {
  data: User | null;
  expiry: number;
};

export let cachedUser: CachedUser | null = null;


export function setCachedUser(newCachedUser: CachedUser): void {
    cachedUser = newCachedUser;
}

export function getCachedUser(): CachedUser | null { 
    return cachedUser;
}