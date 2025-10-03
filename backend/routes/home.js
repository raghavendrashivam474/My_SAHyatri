const express = require('express');
const router = express.Router();
const { tourists } = require('./tourists');
const { incidents } = require('./incidents');

// Sample homepage statistics (some static, some dynamic)
let statistics = {
  activeTourists: () => tourists.length,
  digitalIdsIssued: 8934, // Static for now, could be dynamic
  activeIncidents: () => incidents.length,
  openSosAlerts: () => incidents.filter(i => i.type === 'SOS').length // Assuming SOS type
};

// Sample news/announcements
let news = [
  {
    id: 1,
    date: 'December 15, 2024',
    title: 'Enhanced GPS Tracking',
    description: 'New precision tracking system with improved accuracy for tourist locations and emergency response.',
    link: '/updates/gps-tracking'
  },
  {
    id: 2,
    date: 'December 10, 2024',
    title: 'Multilingual Support',
    description: 'Added support for 15+ languages to improve accessibility for international tourists and local operators.',
    link: '/updates/multilingual'
  },
  {
    id: 3,
    date: 'December 5, 2024',
    title: 'Analytics Dashboard',
    description: 'Advanced analytics and reporting tools for government agencies to monitor tourist safety metrics.',
    link: '/updates/analytics'
  }
];

// Get homepage statistics
router.get('/stats', (req, res) => {
  const stats = {
    activeTourists: statistics.activeTourists(),
    digitalIdsIssued: statistics.digitalIdsIssued,
    activeIncidents: statistics.activeIncidents(),
    openSosAlerts: statistics.openSosAlerts()
  };
  res.json(stats);
});

// Get news/announcements
router.get('/news', (req, res) => {
  res.json(news);
});

// Get all homepage data
router.get('/', (req, res) => {
  const stats = {
    activeTourists: statistics.activeTourists(),
    digitalIdsIssued: statistics.digitalIdsIssued,
    activeIncidents: statistics.activeIncidents(),
    openSosAlerts: statistics.openSosAlerts()
  };
  res.json({
    statistics: stats,
    news
  });
});

// Update statistics (for admin use)
router.put('/stats', (req, res) => {
  statistics = { ...statistics, ...req.body };
  res.json(statistics);
});

// Add news item
router.post('/news', (req, res) => {
  const newNews = {
    id: news.length + 1,
    date: req.body.date,
    title: req.body.title,
    description: req.body.description,
    link: req.body.link
  };
  news.push(newNews);
  res.status(201).json(newNews);
});

module.exports = router;
