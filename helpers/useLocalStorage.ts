"use client";

import { useSyncExternalStore } from "react";

const subscribers = new Set<() => void>();

function setLocalStorage(item: string, value: string) {
  localStorage.setItem(item, value);
  window.dispatchEvent(new StorageEvent("storage", { key: item }));
  subscribers.forEach(callback => callback());
}

function useLocalStorage(item: string) {
  return useSyncExternalStore(
    callback => {
      subscribers.add(callback);
      window.addEventListener("storage", callback);
      return () => {
        subscribers.delete(callback);
        window.removeEventListener("storage", callback);
      };
    },
    () => localStorage.getItem(item),
    () => null,
  );
}

export { setLocalStorage, useLocalStorage };
