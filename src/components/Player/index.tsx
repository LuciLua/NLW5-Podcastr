import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTimeString } from '../../utils/convertDuratinToTimeString';
import { useHeader } from '../../contexts/HeaderContext';


export function Player(){

    const { 
        isDarking,
    } = useHeader();

    // criando estados

    const audioRef = useRef <HTMLAudioElement> (null);
    const [progress, setProgress] = useState(0);

    // importanto do contexts/playercontexts
    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        playNext,
        playPrevious,
        togglePlay,
        setPlayingState,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        toggleShuffle,
        toggleLoop,
        clearPlayerState,
    } = usePlayer();

    // --------------

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying){
            audioRef.current.play();
        } else{
            audioRef.current.pause();
        }
    }, [isPlaying])

    // --------------

    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }

    function handleSeek(amount: number){
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded(){
        if (hasNext){
            playNext()
        } else {
            clearPlayerState();
        }
    }

    const episode = episodeList[currentEpisodeIndex]
    // ---

    return ( 
   
    <div className={!isDarking ? styles.playerContainer : styles.playerContainerisActive}>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora</strong>
            </header>
            {
                episode ? (
                <div className={styles.currentEpisode}>
                    <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail} 
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                    </div>
                
                ):(
                
                <div className={!isDarking ? styles.emptyPlayer : styles.emptyPlayerisActive}>
                    <strong>Selecione um Podcast para ouvir</strong>
                </div>)
            }
            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                <span>{convertDurationToTimeString(progress)}</span>
                {!isDarking ? <div className={styles.slider}>
                        {episode ? (
                        <Slider 
                            trackStyle={{backgroundColor: '#04D361'}}
                            railStyle={{backgroundColor: '#9f75ff'}}
                            handleStyle={{borderColor:'#04D361', backgroundColor:'#9f79ff'}}
                            max={episode.duration}
                            value={progress}
                            onChange={handleSeek}
                        />
                        
                        ) : (
                        
                        <div className={styles.emptySlider}></div>
                        )}
                    </div> : <div className={styles.slider}>
                        {episode ? (
                        <Slider 
                            trackStyle={{backgroundColor: '#33ed97'}}
                            railStyle={{backgroundColor: '#33ed97'}}
                            handleStyle={{borderColor:'#33ed97', backgroundColor:'#33ed97'}}
                            max={episode.duration}
                            value={progress}
                            onChange={handleSeek}
                        />
                        
                        ) : (
                        
                        <div className={styles.emptySlider}></div>
                        )}
                    </div>}
        
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>
                {/* //so vai executar o que tem depois dos "ês comerciais"/&& caso episode seja valida */}
                { episode && (
                    <audio 
                    src={episode.url}
                    autoPlay
                    onEnded={handleEpisodeEnded}
                    ref={audioRef}
                    onPlay={() => setPlayingState(true)}
                    onPause={() => setPlayingState(false)}
                    loop = {isLooping}
                    onLoadedMetadata = {setupProgressListener}
                    />
                )}

                <div className={!isDarking? styles.buttons : styles.buttonsisActive}>
                    <button 
                    type="button" 
                    disabled={!episode || episodeList.length === 1}
                    onClick={toggleShuffle}
                    className={isShuffling ? styles.isActive : ''} 
                    >
                        <img 
                        src="/shuffle.svg" 
                        alt="Embaralhar"/>
                        
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar a anterior"/>
                    </button>
                    <button 
                    type="button" 
                    className={styles.playButton} 
                    disabled={!episode}
                    onClick={togglePlay}
                    >
                        { 
                        isPlaying ? 
                        <img src="/pause.svg" alt="Tocar"/> 
                        : 
                        <img src="/play.svg" alt="Tocar"/>
                        }
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar a próxima"/>
                    </button>
                    <button 
                    type="button" 
                    disabled={!episode}
                    onClick={toggleLoop}
                    className={isLooping ? styles.isActive : ''} 
                    >
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    );
}