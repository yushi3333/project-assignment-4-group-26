// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../utils/db');

// Register User
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const db = getDb();
    const existingUser = await db.collection('Users').findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const trimmedPassword = password.trim()
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    };
    console.log("Hashed Password:", hashedPassword);

    const result = await db.collection('Users').insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = getDb();
    const user = await db.collection('Users').findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }
    console.log("User Password:", user.password);

    
    const passwordMatch = await bcrypt.compare(password.trim(), user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', 
      token,
      role:user.role,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to log in user', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
