const express = require('express');
const router = express.Router();

// Sample settings data
let settings = {
  appName: 'Sahyatri',
  version: '1.0.0',
  notifications: true,
  theme: 'light'
};

// Get settings
router.get('/', (req, res) => {
  res.json(settings);
});

// Update settings
router.put('/', (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
});

module.exports = router;
