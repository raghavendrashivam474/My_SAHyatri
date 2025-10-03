const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Sahyatri Backend API' });
});

// API Routes
app.use('/api/tourists', require('./routes/tourists'));
app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/home', require('./routes/home'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sahyatri Backend server running on port ${PORT}`);
});
