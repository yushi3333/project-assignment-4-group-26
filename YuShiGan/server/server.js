// server.js
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB library





const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// start the server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDb();
    console.log('Connected to MongoDB successfully');
    //routes
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/reviews', reviewRoutes);

    app.put('/api/products/:id/update-stock', async (req, res) => {
      try {
        const productId = req.params.id.trim(); // Trim the ID
        console.log('Trimmed ID:', productId); 
        
        const { quantityBought } = req.body;

        // Ensure productId and quantityBought are provided
        if (!productId || quantityBought == null) {
          return res.status(400).json({ message: 'Product ID or quantity not provided' });
        }

        const db = getDb(); // Get the database reference
        const convertedProductId = new ObjectId(productId);

        // Update product stock using MongoDB native driver
        const productCollection = db.collection("Products");
        const productExists = await productCollection.findOne({ _id: new ObjectId(productId) });

        if (!productExists){
          return res.status(404).json({ message: "Product not found" });
        }
        const updatedProduct = await productCollection.updateOne(
          { _id:  convertedProductId}, // Correct usage of ObjectId
          { $inc: { stock: -quantityBought } }, // Decrease stock by quantity bought
          { returnDocument: 'after' } // Return the updated document
        );

        if (updatedProduct.matchedCount > 0) {
          return res.status(200).json({ message: 'Product updated successfully ' });
        }

        if (updatedProduct.value.stock < 0) {
          // Rollback: if stock goes negative, reset to the previous value
          await db.collection('Products').updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { stock: quantityBought } }
          );
          return res.status(400).json({ message: 'Insufficient stock available' });
        }

        res.status(200).json({ message: 'Stock updated successfully', product: updatedProduct.value });
      } catch (error) {
        console.error('Error updating product stock:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
    });

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
