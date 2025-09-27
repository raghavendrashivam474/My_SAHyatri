const express = require('express');
const router = express.Router();

// Sample data for tourists
let tourists = [
  { id: 1, name: 'John Doe', location: 'Beach' },
  { id: 2, name: 'Jane Smith', location: 'Mountain' }
];

// Get all tourists
router.get('/', (req, res) => {
  res.json(tourists);
});

// Get tourist by ID
router.get('/:id', (req, res) => {
  const tourist = tourists.find(t => t.id === parseInt(req.params.id));
  if (!tourist) return res.status(404).json({ message: 'Tourist not found' });
  res.json(tourist);
});

// Add a new tourist
router.post('/', (req, res) => {
  const newTourist = {
    id: tourists.length + 1,
    name: req.body.name,
    location: req.body.location
  };
  tourists.push(newTourist);
  res.status(201).json(newTourist);
});

module.exports = router;
