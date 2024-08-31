const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { execSync } = require('child_process');

router.get('/desktop', (req, res) => {
  const desktopPath = path.join(require('os').homedir(), 'Desktop');
  fs.readdir(desktopPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(files);
  });
});

router.get('/drives', (req, res) => {
  // This command works on Windows to list all drives
  const drives = execSync('wmic logicaldisk get name').toString().split('\n')
    .map(line => line.trim()).filter(line => /^[A-Z]:$/.test(line));

  res.json(drives);
});

router.get('/drives/:drive', (req, res) => {
  const drivePath = `${req.params.drive}\\\\`;
  fs.readdir(drivePath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(files);
  });
});

module.exports = router;
