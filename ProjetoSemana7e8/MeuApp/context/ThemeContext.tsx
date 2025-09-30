import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface ThemeColors {
  background: string;
  cardBackground: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  tabBar: string;
  deleteButton: string;
  deleteButtonBg: string;
}

interface ThemeState {
  isDark: boolean;
  colors: ThemeColors;
}

type ThemeAction = { type: "TOGGLE_THEME" };

const lightTheme: ThemeColors = {
  background: "#f8f9fa",
  cardBackground: "#ffffff",
  primary: "#007bff",
  text: "#333333",
  textSecondary: "#666666",
  border: "#e0e0e0",
  tabBar: "#ffffff",
  deleteButton: "#dc3545",
  deleteButtonBg: "#ffe5e5",
};

const darkTheme: ThemeColors = {
  background: "#1a1a1a",
  cardBackground: "#2d2d2d",
  primary: "#0d6efd",
  text: "#ffffff",
  textSecondary: "#b0b0b0",
  border: "#404040",
  tabBar: "#2d2d2d",
  deleteButton: "#ff4d4d",
  deleteButtonBg: "#4d1a1a",
};

const initialState: ThemeState = {
  isDark: false,
  colors: lightTheme,
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        isDark: !state.isDark,
        colors: !state.isDark ? darkTheme : lightTheme,
      };
    default:
      return state;
  }
};

interface ThemeContextType {
  theme: ThemeState;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }
  return context;
};
