"use client";

import { SectionProps } from "@/app/slide-deck/page";
import { ThemesInterface } from "@/constants/placeholder";
import { createContext, useEffect, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

// Theme Context for managing theme selection and content

interface ThemeContextType {
  // Not in use, will soon remove them
    selectedTheme: ThemesInterface | null;
    setSelectedTheme: Dispatch<SetStateAction<ThemesInterface | null>>;
    content: object[];
    setContent: Dispatch<SetStateAction<object[]>>;

    // In Use
    slideStates: SectionProps[],
    setSlideState: Dispatch<SetStateAction<SectionProps[]>>;
}

const ThemeContext = createContext<ThemeContextType>({
    selectedTheme: null,
    setSelectedTheme: () => {},
    content: [],
    setContent: () => {},
    slideStates: [],
    setSlideState: () => {}
});

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    
  const [selectedTheme, setSelectedTheme] = useState<ThemesInterface | null>(null);
  const [content, setContent] = useState<object[]>([]);
  const [slideStates, setSlideState] = useState<SectionProps[]>([]);

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme, content, setContent, slideStates, setSlideState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
