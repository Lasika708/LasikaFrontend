// Database configuration
// This file can be adapted for MongoDB, PostgreSQL, MySQL, etc.

let db = {
  // In-memory database for development
  // Replace this with actual database connection
  projects: [],
  tasks: [],
  users: []
};

// Example: MongoDB connection (uncomment and configure if using MongoDB)
/*
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
*/

export default db;

