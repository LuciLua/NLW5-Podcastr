// style global
import '../styles/global.scss'

// outros style
import styles from '../styles/app.module.scss'

// páginas
import { Header } from '../components/Header'
import { Player } from '../components/Player'

import { useState } from 'react'

import { PlayerContextProvider } from '../contexts/PlayerContext'

//inicio do codigo
function MyApp({ Component, pageProps }) {
  return(
    <PlayerContextProvider>  
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  )
}

export default MyApp
