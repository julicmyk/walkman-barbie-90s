import { useState, useRef, useEffect, useCallback } from 'react';

export function useAudioPlayer(playlist) {
  const audioRef = useRef(new Audio());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('idle'); // 'idle' | 'playing' | 'rewinding' | 'forwarding'
  const seekIntervalRef = useRef(null);
  const wasPlayingRef = useRef(false);
  const tapeSoundRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  const next = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

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
  }, [currentTrackIndex, next]);

  const TAPE_START = 1;    // saltar el silencio del inicio
  const TAPE_END = 3.1;    // cortar antes del silencio del final

  const startTapeSound = useCallback(() => {
    if (!tapeSoundRef.current) {
      const audio = new Audio(`${import.meta.env.BASE_URL}music/tape-rewind.m4a`);
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime >= TAPE_END) {
          audio.currentTime = TAPE_START;
        }
      });
      tapeSoundRef.current = audio;
    }
    tapeSoundRef.current.currentTime = TAPE_START;
    tapeSoundRef.current.play();
  }, []);

  const stopTapeSound = useCallback(() => {
    if (tapeSoundRef.current) {
      tapeSoundRef.current.pause();
    }
  }, []);

  const stopSeeking = useCallback(() => {
    if (seekIntervalRef.current) {
      clearInterval(seekIntervalRef.current);
      seekIntervalRef.current = null;
    }
  }, []);

  // Sonido de cinta ligado al modo
  useEffect(() => {
    if (mode === 'rewinding' || mode === 'forwarding') {
      startTapeSound();
    } else {
      stopTapeSound();
    }
    return () => stopTapeSound();
  }, [mode, startTapeSound, stopTapeSound]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      stopSeeking();
      stopTapeSound();
    };
  }, [stopSeeking, stopTapeSound]);

  const play = useCallback(() => {
    stopSeeking();
    audioRef.current.play();
    setIsPlaying(true);
    setMode('playing');
  }, [stopSeeking]);

  const pause = useCallback(() => {
    stopSeeking();
    audioRef.current.pause();
    setIsPlaying(false);
    setMode('idle');
  }, [stopSeeking]);

  const togglePlay = useCallback(() => {
    // Si está rebobinando o adelantando, play retoma la reproducción
    if (mode === 'rewinding' || mode === 'forwarding') {
      play();
      return;
    }
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [mode, isPlaying, play, pause]);

  const rewind = useCallback(() => {
    if (mode === 'rewinding') {
      // Ya está rebobinando: parar
      stopSeeking();
      setMode('idle');
      return;
    }

    // Recordar si estaba sonando
    wasPlayingRef.current = isPlaying;
    audioRef.current.pause();
    setIsPlaying(false);
    stopSeeking();
    setMode('rewinding');

    seekIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      const newTime = audio.currentTime - 0.5;
      if (newTime <= 0) {
        audio.currentTime = 0;
        stopSeeking();
        setMode('idle');
      } else {
        audio.currentTime = newTime;
      }
    }, 150);
  }, [mode, isPlaying, stopSeeking]);

  const fastForward = useCallback(() => {
    if (mode === 'forwarding') {
      // Ya está adelantando: parar
      stopSeeking();
      setMode('idle');
      return;
    }

    wasPlayingRef.current = isPlaying;
    audioRef.current.pause();
    setIsPlaying(false);
    stopSeeking();
    setMode('forwarding');

    seekIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      const newTime = audio.currentTime + 0.5;
      if (newTime >= audio.duration) {
        audio.currentTime = audio.duration;
        stopSeeking();
        setMode('idle');
        next();
      } else {
        audio.currentTime = newTime;
      }
    }, 150);
  }, [mode, isPlaying, stopSeeking, next]);

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    mode,
    play,
    pause,
    togglePlay,
    rewind,
    fastForward,
  };
}
