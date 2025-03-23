import { PotContext } from "./contexts/PotContext";
import { useContext } from "react";
    
export function usePotContext() {   
  const potContext = useContext(PotContext);
  if (!potContext) {
    throw new Error('usePotContext must be used within a PotContextProvider');
  }
  return potContext;
}