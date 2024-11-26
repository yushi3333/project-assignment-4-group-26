
const { MongoClient } = require('mongodb');

let db; // Variable to hold the reference to the database
let client; // Variable to hold the MongoDB client

// connect to MongoDB
async function connectToDb() {
  if (!db) {
    try {
      const uri = process.env.MONGO_URI;

      if (!uri) {
        throw new Error('MongoDB connection string (MONGO_URI) is not defined in .env file');
      }

      client = new MongoClient(uri, {autoSelectFamily:false});
      await client.connect();
      console.log('Connected to MongoDB successfully');

      db = client.db('eCommerce'); //database name
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
  return db;
}

// Function to get the reference to the database
function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDb first.');
  }
  return db;
}

// Function to close the database connection
async function closeDb() {
  if (client) {
    await client.close();
    db = null;
    client = null;
    console.log('MongoDB connection closed');
  }
}

module.exports = {
  connectToDb,
  getDb,
  closeDb,
};
