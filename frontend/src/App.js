import React, { useState } from 'react';
import Desktop from './components/Desktop';
import MyComputer from './components/MyComputer';
import Dock from './components/Dock';
import AnimatedBackground from './components/AnimatedBackground'; // Import the new component
import './App.css';

function App() {
  const [view, setView] = useState('mycomputer'); // 'desktop' or 'mycomputer'

  return (
    <AnimatedBackground>
      <div className="App">
        {view === 'desktop' && <Desktop setView={setView} />}
        {view === 'mycomputer' && <MyComputer setView={setView} />}
        <Dock  setView={setView} />
      </div>
    </AnimatedBackground>
  );
}

export default App;