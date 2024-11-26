// server.js
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./utils/db');


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

   

    // Get products from the database (example route)
  
    // app.get('/api/products', async (req, res) => {
    //   try {
    //     const db = getDb(); // Get the database reference
    //     const productsCollection = db.collection('Products'); // Access 'Products' collection
    //     const products = await productsCollection.find().toArray();
    //     console.log('Products fetched:', products);
    //     res.status(200).json(products);
    //   } catch (error) {
    //     res.status(500).json({ message: 'Failed to fetch products', error });
    //   }
    // });

    // Start the server after connecting to MongoDB
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

startServer();
