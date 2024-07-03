const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await client.connect();
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = { connectDB, client };
