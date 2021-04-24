import { type } from 'node:os';
import { createContext, ReactNode, useContext, useState } from 'react';

import { ThemeProvider as ThemeProviderComponent } from 'styled-components';

import * as themes from '../pages/theme'

//tipagem

type HeaderContextData ={
    toggleTheme: () => void;
    setThemeState: (state: boolean) => void;
    changeTheme: string;
    isDarking: boolean;
}

type HeaderContextProviderProps = {
    children: ReactNode;
}

type themesNames = ['Light', 'Dark'];


interface ThemeContextData {
    theme: typeof themes.DarkTheme
    changeTheme(name: string): void
  }

//consts

  const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

//exportar

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState(themes.DarkTheme)
  
    const changeTheme = (name: themesNames) => {
      Object.keys(themes).map(
        theme => themes[theme].title === name && setTheme(themes[theme])
      )
    }
  
    return (
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <ThemeProviderComponent theme={theme}>{children}</ThemeProviderComponent>
      </ThemeContext.Provider>
    )
  }

export const HeaderContext = createContext({} as HeaderContextData);

export function HeaderContextProvider({ children }: HeaderContextProviderProps ){

    //eventos ("valor inicial")
    const [isDarking, setIsTheming] = useState(false);

    const { theme, changeTheme } = useTheme()

    //funcoes


    function toggleTheme(){
        setIsTheming(!isDarking)
        changeTheme(theme.title === 'dark' ? 'light' : 'Dark');
    }

    function setThemeState(state: boolean){
        setIsTheming(state)
    }


    return (
        <HeaderContext.Provider value={{ 

            toggleTheme,
            isDarking,
            setThemeState,
            changeTheme,
            theme
            }}        
            >
            <ThemeProviderComponent
                theme={theme}>
                {children}
            </ThemeProviderComponent>
                {children}
        </HeaderContext.Provider>
      )
    };

//exportar

export const useHeader = () => {
    return useContext(HeaderContext);
}

// Hook
export function useTheme(): ThemeContextData {
    const context = useContext(ThemeContext)
  
    return context
  }
  




