import React, { useEffect, useRef } from 'react';
import './App.css';
import PlayButton from './components/PlayButton';
import AudioRange from './components/AudioRange';
import AudioPlayer from './features/AudioPlayer';

function App() {
  return (
    <div className="App-header">
      <AudioPlayer />
    </div>
  );
}

export default App;
