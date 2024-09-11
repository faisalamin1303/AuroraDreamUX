import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileViewer.css';

function FileViewer({ path, onOpenFolder, onOpenFile }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/files${path}`)
      .then(response => setFiles(response.data))
      .catch(error => console.error(`Error fetching files for path ${path}:`, error));
  }, [path]);

  const getFileIcon = (fileName) => {
    if (!fileName) {
      return require('../assets/file.png'); // Fallback to a generic file icon
    }

    const extension = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : 'folder';
    try {
      return require(`../assets/${extension}.png`);
    } catch (err) {
      return extension === 'folder' ? require('../assets/folder.png') : require('../assets/file.png');
    }
  };

  const handleDoubleClick = (file) => {
    if (file.isDirectory) {
      onOpenFolder(`${path}/${file.name}`);
    } else {
      onOpenFile(`${path}/${file.name}`);
    }
  };

  return (
    <div className="file-viewer">
      {files.map((file, index) => (
        <div className="icon" key={index} onDoubleClick={() => handleDoubleClick(file)}>
          <img src={getFileIcon(file.name)} alt={file.name} />
          <span>{file.name}</span>
        </div>
      ))}
    </div>
  );
}

export default FileViewer;
