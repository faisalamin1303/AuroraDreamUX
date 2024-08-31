const express = require('express');
const cors = require('cors');
const fileRoutes = require('./routes/files');

const app = express();
const port = 5000;

app.use(cors());
app.use('/files', fileRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
