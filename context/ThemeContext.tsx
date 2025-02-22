"use client";

import { ThemesInterface } from "@/constants/placeholder";
import { createContext, useEffect, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

// Theme Context for managing theme selection and content

interface ThemeContextType {
    selectedTheme: ThemesInterface | null;
    setSelectedTheme: Dispatch<SetStateAction<ThemesInterface | null>>;
    content: object[];
    setContent: Dispatch<SetStateAction<object[]>>;
}

const ThemeContext = createContext<ThemeContextType>({
    selectedTheme: null,
    setSelectedTheme: () => {},
    content: [],
    setContent: () => {}
});

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    
  const [selectedTheme, setSelectedTheme] = useState<ThemesInterface | null>(null);
  const [content, setContent] = useState<object[]>([]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme, content, setContent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
