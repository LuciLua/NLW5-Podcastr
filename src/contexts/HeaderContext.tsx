import { createContext, ReactNode, useContext, useState } from 'react';

import styles from '../pages/homeDark.module.scss';

//tipagem

type HeaderContextData ={
    toggleTheme: () => void;
    setThemeState: (state: boolean) => void;
    isDarking: boolean;
}

type HeaderContextProviderProps = {
    children: ReactNode;
}

//exportar

export const HeaderContext = createContext({} as HeaderContextData);

export function HeaderContextProvider({ children }: HeaderContextProviderProps ){

    //eventos ("valor inicial")
    const [isDarking, setIsTheming] = useState(false);

    //funcoes

    function toggleTheme(){
        setIsTheming(!isDarking)
    }

    function setThemeState(state: boolean){
        setIsTheming(state)
    }


    return (


        <HeaderContext.Provider value={{ 

        toggleTheme,
        isDarking,
        setThemeState

        }}
         >
            {children}
        </HeaderContext.Provider>
      )
    };

//exportar

export const useHeader = () => {
    return useContext(HeaderContext);
}


