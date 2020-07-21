import React, {createContext} from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const MenuContext = createContext({
  menu: false,
  toggleMenu: () => {},
});