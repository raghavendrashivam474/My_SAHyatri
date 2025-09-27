const express = require('express');
const router = express.Router();

// Sample data for incidents
let incidents = [
  { id: 1, type: 'Accident', location: 'Highway', description: 'Minor collision' },
  { id: 2, type: 'Lost Tourist', location: 'Park', description: 'Tourist lost near entrance' }
];

// Get all incidents
router.get('/', (req, res) => {
  res.json(incidents);
});

// Get incident by ID
router.get('/:id', (req, res) => {
  const incident = incidents.find(i => i.id === parseInt(req.params.id));
  if (!incident) return res.status(404).json({ message: 'Incident not found' });
  res.json(incident);
});

// Add a new incident
router.post('/', (req, res) => {
  const newIncident = {
    id: incidents.length + 1,
    type: req.body.type,
    location: req.body.location,
    description: req.body.description
  };
  incidents.push(newIncident);
  res.status(201).json(newIncident);
});

module.exports = router;
