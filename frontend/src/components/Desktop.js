import React, { useState, useEffect } from 'react';
import axios from 'axios';
import myComputerIcon from '../assets/my_computer.png';
import fileIcon from '../assets/file.png'; // A generic file icon in case specific icons are missing
import './Desktop.css';

function Desktop({ setView }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/files/desktop')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching desktop files:', error));
  }, []);

  const getFileIcon = (fileName) => {
    // Extract the file extension
    const extension = fileName.split('.').pop().toLowerCase();
    // Construct the icon path
    try {
      return require(`../assets/${extension}.png`);
    } catch (err) {
      // If the specific icon does not exist, fall back to a generic icon
      return fileIcon;
    }
  };

  return (
    <div className="desktop">
      <div className="icon" onClick={() => setView('mycomputer')}>
        <img src={myComputerIcon} alt="My Computer" />
        <span>My Computer</span>
      </div>
      {files.map((file, index) => (
        <div className="icon" key={index}>
          <img src={getFileIcon(file)} alt={file} />
          <span>{file}</span>
        </div>
      ))}
    </div>
  
  );
}

export default Desktop;
