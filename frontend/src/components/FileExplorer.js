import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backIcon from '../assets/back.png';
import forwardIcon from '../assets/forward.png';
import './FileExplorer.css';

function FileExplorer({ drive }) {
  const [files, setFiles] = useState([]);
  const [history, setHistory] = useState([drive]);
  const [currentPath, setCurrentPath] = useState(drive);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    fetchDrives();
    fetchFiles(currentPath);
  }, [currentPath]);

  const fetchDrives = () => {
    axios.get('http://localhost:5000/files/drives')
      .then(response => setDrives(response.data))
      .catch(error => console.error('Error fetching drives:', error));
  };

  const fetchFiles = (path) => {
    axios.get(`http://localhost:5000/files/drives/${path}`)
      .then(response => setFiles(response.data))
      .catch(error => console.error(`Error fetching files for path ${path}:`, error));
  };

  const navigateBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const navigateForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const openFolder = (folderName) => {
    const newPath = `${currentPath}\\${folderName}`;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(historyIndex + 1);
    setCurrentPath(newPath);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : 'folder';
    try {
      return require(`../assets/${extension}.png`);
    } catch (err) {
      return extension === 'folder' ? require('../assets/folder.png') : require('../assets/file.png');
    }
  };

  return (
    <div className="file-explorer">
      <div className="toolbar">
        <button onClick={navigateBack} disabled={historyIndex === 0}>
          <img src={backIcon} alt="Back" />
        </button>
        <button onClick={navigateForward} disabled={historyIndex === history.length - 1}>
          <img src={forwardIcon} alt="Forward" />
        </button>
        <span className="path-display">{currentPath}</span>
        <div className="drive-links">
          {drives.map((drive, index) => (
            <button key={index} onClick={() => setCurrentPath(drive)}>
              {drive}
            </button>
          ))}
        </div>
      </div>
      <div className="file-grid">
        {files.map((file, index) => (
          <div className="icon" key={index} onDoubleClick={() => openFolder(file)}>
            <img src={getFileIcon(file)} alt={file} />
            <span>{file}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileExplorer;