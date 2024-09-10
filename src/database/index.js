import mongoose from 'mongoose';
import 'dotenv/config'; 

const uri = process.env.DB_HOSTNAME;

const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      const db = mongoose.connection.db;
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  };
  
  export default connectDB;