// src/components/Dock.js

import React from 'react';
import './Dock.css';
import settingsIcon from '../assets/settings.png';
import browserIcon from '../assets/browser.png';
import displayIcon from '../assets/display.png';
import searchIcon from '../assets/search.png';

function Dock() {
  return (
    <div className="dock">
      <div className="dock-icon"><img src={settingsIcon} alt="Settings" /></div>
      <div className="dock-icon"><img src={browserIcon} alt="Browser" /></div>
      <div className="dock-icon"><img src={displayIcon} alt="Display" /></div>
      <div className="dock-icon"><img src={searchIcon} alt="Search" /></div>
    </div>
  );
}

export default Dock;
