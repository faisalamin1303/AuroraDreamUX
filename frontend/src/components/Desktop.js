import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desktop.css';
import Window from './Window';
import FileViewer from './FileViewer';

function Desktop({ setView }) {
  const [windows, setWindows] = useState([]);
  const [desktopFiles, setDesktopFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/files/desktop') // Adjust this path according to your backend
      .then(response => setDesktopFiles(response.data))
      .catch(error => console.error('Error fetching desktop files:', error));
  }, []);

  const openWindow = (path) => {
    setWindows([...windows, { path, title: path.split('/').pop() }]);
  };

  const closeWindow = (index) => {
    setWindows(windows.filter((_, i) => i !== index));
  };

  return (
    <div className="desktop">
      {desktopFiles.map((file, index) => (
        <div className="icon" key={index} onDoubleClick={() => openWindow(`/desktop/${file.name}`)}>
          <img src={require('../assets/file.png')} alt={file.name} />
          <span>{file.name}</span>
        </div>
      ))}
      {windows.map((win, index) => (
        <Window key={index} title={win.title} onClose={() => closeWindow(index)}>
          <FileViewer path={win.path} onOpenFolder={openWindow} onOpenFile={(path) => console.log(`Open file at ${path}`)} />
        </Window>
      ))}
    </div>
  );
}

export default Desktop;
