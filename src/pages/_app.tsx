// style global
import '../styles/global.scss'

// outros style
import styles from '../styles/app.module.scss'

// páginas
import { Header } from '../components/Header'
import { Player } from '../components/Player'

//inicio do codigo
function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
