"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { LuLoaderCircle } from "react-icons/lu";

import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";

interface LoaderContextType {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | null>(null);

export default function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoading must be used within a <Loader />");
  }

  return context;
}

type LoaderProps = {
  defaultValue?: boolean;
  children: ReactNode;
};

export function Loader({ defaultValue = false, children }: LoaderProps) {
  const [loading, setLoading] = useState(defaultValue);

  return (
    <LoaderContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
      <Dialog
        defaultOpen={defaultValue}
        open={loading}
        onOpenChange={setLoading}
      >
        <DialogPortal>
          <DialogOverlay>
            <LuLoaderCircle className="text-brand-1 animate-spin text-6xl" />
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </LoaderContext.Provider>
  );
}
