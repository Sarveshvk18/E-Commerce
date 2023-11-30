// auth.js
const express = require('express');
const router = express.Router();
const users = require('./users');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username and password match any user in the array
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
