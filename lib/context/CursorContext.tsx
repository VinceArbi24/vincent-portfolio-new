"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CursorVariant = "default" | "view" | "frame" | "link" | "copy";

type CursorState = {
  variant: CursorVariant;
  label: string;
};

type CursorContextValue = CursorState & {
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
};

const DEFAULT_STATE: CursorState = { variant: "default", label: "" };

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CursorState>(DEFAULT_STATE);

  const setCursor = useCallback((variant: CursorVariant, label = "") => {
    setState({ variant, label });
  }, []);

  const resetCursor = useCallback(() => setState(DEFAULT_STATE), []);

  const value = useMemo(
    () => ({ ...state, setCursor, resetCursor }),
    [state, setCursor, resetCursor]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
