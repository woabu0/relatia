import dotenv from 'dotenv';
// Load environment variables FIRST
dotenv.config();

import app from './server';
import connectDB from './config/db';

const startServer = async () => {
  try {
    // Check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('MongoDB URI:', process.env.MONGODB_URI ? '✓ Loaded' : '✗ Missing');
    
    await connectDB();
    
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();