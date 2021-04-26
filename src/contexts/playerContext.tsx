import { createContext, useState, useContext, ReactNode } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isShuffling: boolean;
  isLooping: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playPrevious: () => void;
  playNext: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

// Creates the context and defines its format
export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isShuffling,
        isLooping,
        hasPrevious,
        hasNext,
        play,
        playList,
        playPrevious,
        playNext,
        togglePlay,
        toggleShuffle,
        toggleLoop,
        setPlayingState,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
