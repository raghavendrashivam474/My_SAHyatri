const express = require('express');
const router = express.Router();

// Sample user data
const users = [
  { id: 1, username: 'admin', password: 'password' },
  { id: 2, username: 'user', password: 'pass' }
];

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
});

// Register endpoint (basic)
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered', user: { id: newUser.id, username: newUser.username } });
});

module.exports = router;
