import { useState, useRef, useEffect } from 'react';

export function useAudioPlayer(playlist) {
  const audioRef = useRef(new Audio());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = currentTrack.url;

    if (isPlaying) {
      audio.play();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      next();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentTrackIndex, playlist.length]);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const rewind = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const fastForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  };

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    play,
    pause,
    togglePlay,
    rewind,
    fastForward,
  };
}
