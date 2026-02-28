import { useContext } from "react";
import { ILayoutContext, LayoutContext } from "../context/LayoutProvider";

export function useLayout() {
  return useContext(LayoutContext) as ILayoutContext;
}
