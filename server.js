const express = require('express');
const path = require('path');
const recordRoutes = require('./routes/recordRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', recordRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});