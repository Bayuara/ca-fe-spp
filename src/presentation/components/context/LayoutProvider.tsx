import React, { useState } from "react";

export interface ILayoutContext {
  hideLayout: boolean;
  setHideLayout: (val: boolean) => void;
}

export const LayoutContext = React.createContext<ILayoutContext | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [hideLayout, setHideLayout] = useState(false);

  return (
    <LayoutContext.Provider value={{ hideLayout, setHideLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
