// server.js
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 



const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Function to start the server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDb();
    console.log('Connected to MongoDB successfully');
    //routes
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/reviews', reviewRoutes);

 
    // Start the server after connecting to MongoDB
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
}

startServer();
