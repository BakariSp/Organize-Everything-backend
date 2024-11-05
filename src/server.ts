import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cardsRoutes from './routes/cards';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cards', cardsRoutes);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interactive-workspace';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  }); 