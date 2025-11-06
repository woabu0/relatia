import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // Double check the URI
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined');
    }

    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;