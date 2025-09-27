const express = require('express');
const router = express.Router();

// Sample reports data
let reports = [
  { id: 1, title: 'Monthly Tourist Report', data: 'Total tourists: 1500' },
  { id: 2, title: 'Incident Summary', data: 'Total incidents: 25' }
];

// Get all reports
router.get('/', (req, res) => {
  res.json(reports);
});

// Get report by ID
router.get('/:id', (req, res) => {
  const report = reports.find(r => r.id === parseInt(req.params.id));
  if (!report) return res.status(404).json({ message: 'Report not found' });
  res.json(report);
});

// Add a new report
router.post('/', (req, res) => {
  const newReport = {
    id: reports.length + 1,
    title: req.body.title,
    data: req.body.data
  };
  reports.push(newReport);
  res.status(201).json(newReport);
});

module.exports = router;
