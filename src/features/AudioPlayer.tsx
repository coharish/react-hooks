import React, { useCallback, useEffect, useRef, useState } from 'react';
import useAudio from '../hooks/useAudio';
import AudioRange from '../components/AudioRange';
import PlayButton from '../components/PlayButton';
import { useInterval } from '../hooks/useInterval';

const url =
  'https://p.scdn.co/mp3-preview/d09498fe7e41e26b90682c3b5a0819bbcc3378e2';

const AudioPlayer = () => {
  const { audio, isPlaying, toggle, play, pause } = useAudio({
    src: url
  });
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    const rangeEl = ref.current;
    if (rangeEl) {
      rangeEl.value = audio.currentTime.toString();
      rangeEl.max = audio.duration.toString();
      rangeEl.addEventListener('change', (e: any) => {
        console.log(e);
        rangeEl.value = audio.currentTime.toString();
        clearInterval(timer.timer);
      });
    }
  }, [ref, audio.duration, audio.currentTime]);

  const timer = useInterval(
    () => {
      console.log(timer);
      if (ref && ref.current) {
        ref.current.value = audio.currentTime.toString();
      }
    },
    isPlaying ? 1000 : null
  );

  const toggleCallback = useCallback(() => {
    toggle();
    clearInterval(timer.timer);
  }, [isPlaying]);

  return (
    <>
      <AudioRange ref={ref} />
      <PlayButton onClick={toggleCallback} isPlaying={isPlaying} />
    </>
  );
};

export default AudioPlayer;
