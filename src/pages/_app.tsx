// style global
import '../styles/global.scss'

// outros style
import styles from '../styles/app.module.scss'

// páginas
import { Header } from '../components/Header'
import { Player } from '../components/Player'

import { PlayerContextProvider } from '../contexts/PlayerContext'
import { HeaderContextProvider} from '../contexts/HeaderContext'

//inicio do codigo
function MyApp({ Component, pageProps }) {
  return(
      <HeaderContextProvider>
        <PlayerContextProvider>  
          <div className={styles.wrapper}>
            <main>
              <Header />
              <Component {...pageProps} />
            </main>
            <Player />
          </div>
        </PlayerContextProvider>
      </HeaderContextProvider>
  )
}

export default MyApp
