import React, { forwardRef, useEffect, useState } from 'react';

const AudioRange = forwardRef((props, ref: any) => {
  const [progress, setTrackProgress] = useState(0);

  const onScrub = (value: number) => {
    setTrackProgress(value);
  };

  return (
    <>
      <input
        ref={ref}
        type="range"
        //   value={progress}
        step="1"
        // max={duration ? duration : `${duration}`}
        className="progress"
        //   onChange={(e) => onScrub(Number(e.target.value))}
        //   onMouseUp={onScrubEnd}
        //   onKeyUp={onScrubEnd}
      />
    </>
  );
});

export default AudioRange;
