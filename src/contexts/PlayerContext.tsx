import { createContext, ReactNode, useContext, useState } from 'react';


// Tipagem

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playNext: () => void;
    playPrevious: () => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevious: boolean;
    toggleLoop: () => void;
    isLooping: boolean;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
    isShuffling: boolean;
};

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps ){
    
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  function clearPlayerState(){
      setEpisodeList(([]));
      setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

  function playNext(){

    if (isShuffling){
        const nextRandomEpisodeIndex = Math.floor(Math.random() * (episodeList.length))
        setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext){

        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious(){

    if (hasPrevious){
        setCurrentEpisodeIndex (currentEpisodeIndex - 1);
    }
  }

  return (


    <PlayerContext.Provider value={{ 
    episodeList,
    currentEpisodeIndex,
    hasNext,
    hasPrevious,
    isPlaying,
    isLooping,
    isShuffling,
    play,
    playNext,
    playPrevious,
    playList,
    togglePlay,
    setPlayingState,
    toggleLoop,
    toggleShuffle,
    clearPlayerState,
    }}
     >
        {children}
    </PlayerContext.Provider>
  )
};

//agora, se o componente quiser usar o plaer é só escrever usePlayer
export const usePlayer = () => {
    return useContext(PlayerContext);
}