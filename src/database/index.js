import mongoose from 'mongoose';
import 'dotenv/config'; 

const uri = process.env.DB_HOSTNAME;

const connectDB = async () => {
    try {
      const options = {
        maxPoolSize: 10,  
        serverSelectionTimeoutMS: 5000, 
        socketTimeoutMS: 45000, 
      };
      await mongoose.connect(uri,options);
      const db = mongoose.connection.db;
      console.log("MongoDB Connection sucesfull")
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  };
  
  export default connectDB;