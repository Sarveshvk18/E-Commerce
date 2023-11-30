
const express = require('express');
const router = express.Router();
const { getDB } = require('./connection');

// Login route with query parameters
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = getDB();
    const usersCollection = db.collection('user');
    console.log('Received data:', req.body);
    const user = await usersCollection.findOne({ username, password });

    if (user) {
      res.json({ success: true, name: user.name }); 
      console.log('true');
    } else {
      res.json({ success: false });
      console.log('false');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Signup route with query parameters
router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const db = getDB();
    const usersCollection = db.collection('user');

    console.log('Received signup data:', req.body);

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      console.log('Username already exists');
      res.json({ success: false, message: 'Username already exists' });
    } else {
      // If the username doesn't exist, create a new user
      const newUserResult = await usersCollection.insertOne({ name, username, password });

      console.log('New user result:', newUserResult);

      if (newUserResult.acknowledged && newUserResult.insertedId) {
        // Get the newly inserted user using the insertedId
        const newUser = await usersCollection.findOne({ _id: newUserResult.insertedId });
        console.log('Signup successful:', newUser);
        res.json({ success: true, user: newUser });
      } else {
        console.error('Error creating a new user. Insert not acknowledged or insertedId not found');
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;

