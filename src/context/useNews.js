import { useContext } from "react";
import { NewsContext } from "./newsContextBase";

export function useNews() {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
}
