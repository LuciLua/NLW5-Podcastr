// style global
import '../styles/global.scss'

// outros style
import styles from '../styles/app.module.scss'

// páginas
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react'

//inicio do codigo
function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);

  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  return (

    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState}}>

      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
