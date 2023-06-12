import React, { useEffect, useMemo, useState } from 'react';

export type AudioProps = {
  src: string;
  volume?: number;
  playbackRate?: number;
  onLoadedData?: (e: Event) => void;
  onError?: (e: Event) => void;
  onEnded?: (e: Event) => void;
};

export type State = {
  isPlaying: boolean;
  audio: HTMLAudioElement;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};
/**
 * useAudio Hook
 *
 * React hook to play audio without any dom element
 */
const useAudio = ({ src, volume, ...rest }: AudioProps): State => {
  const audio = useMemo(() => new Audio(src), [src]);

  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        setIsPlaying(false);
        rest.onError?.(error);
      });
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    isPlaying ? pause() : play();
  };

  useEffect(() => {
    // initialise the audio settings

    // Adjust the volume of the audio, default is 1(max)
    audio.volume = volume || 1;

    // Execute the onLoadedData function after finishing the loading of audio
    audio.onloadeddata = (e: Event) => rest.onLoadedData?.(e);

    // Execute after the ending of the audio
    audio.addEventListener('ended', (e: Event) => {
      // Execute the onEnded function
      rest.onEnded?.(e);
      setIsPlaying(false);
      pause();
    });
    // Cleanup
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [src, volume, rest, audio]);

  return { audio, isPlaying, play, pause, toggle };
};

export default useAudio;
