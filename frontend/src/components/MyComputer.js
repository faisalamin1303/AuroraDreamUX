import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileExplorer from './FileExplorer';
import './MyComputer.css';

function MyComputer({ setView }) {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/files/drives')
      .then(response => setDrives(response.data))
      .catch(error => console.error('Error fetching drives:', error));
  }, []);

  return (
    <div className="my-computer">
      {selectedDrive ? (
        <FileExplorer drive={selectedDrive} />
      ) : (
        <>
          <div className="icon" onClick={() => setView('desktop')}>
            <img src={require('../assets/my_computer.png')} alt="Back to Desktop" />
            <span>Back to Desktop</span>
          </div>
          {drives.map((drive, index) => (
            <div className="icon" key={index} onClick={() => setSelectedDrive(drive)}>
              <img src={require('../assets/drive.png')} alt={drive} />
              <span>{drive}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MyComputer;
