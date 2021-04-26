import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

import { useHeader, } from '../../contexts/HeaderContext';
import { useEffect, useRef } from 'react';

export function Header(){
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })

    const imageRef = useRef <HTMLImageElement> (null);
    
    const { 
        toggleTheme,
        isDarking,
    } = useHeader();

    useEffect(() => {
        if (!imageRef.current) {
            console.log('???');
        }
        if (!!isDarking){
            console.log('Dark ativado')
            // imageRef.current.light()
        } else{
            console.log('Dark Desativado');
            // imageRef.current.dark();
        }
    });

    return(
        <header className={!isDarking ? styles.headerContainer : styles.headerContainerisActive}>
            <img src="/logo.svg" alt="Podcastr"/>

            <p>O melhor para você ouvir sempre!</p>

            <button 
                    type="button" 
                    className={!isDarking ?
                    '' 
                        :
                    styles.isActive} 
                    onClick={toggleTheme}
                    >
                        { 
                        // so muda a imagem
                        !isDarking ? 
                        <img 
                        src="/sun.svg" 
                        alt="Light" 
                        ref={imageRef}
                        />
                        : 
                        <img src="/moon.svg" 
                        alt="Dark"
                        ref={imageRef}/>
                        }

                        {
                            !isDarking ?
                            <span>Tema atual: Light</span> 
                            :
                            <span>Tema atual: Dark</span>
                        }
            </button>
            
            <span>{currentDate}</span>
        </header>
    );
}