import dotenv from 'dotenv';
import app from './app';
import connectDB from './src/models/db'; // Import the connectDB function
import { config } from './src/config/config';

dotenv.config();

connectDB().then(() => {
  const server = app.listen(config.port || 3000, () => {
      console.log(`[INFO]: Server is running on Port: ${config.port || 3000}`);
  });

  process.on('SIGTERM', () => {
    console.info('[INFO]: SIGTERM signal received. Closing server.');
    server.close((err) => {
      console.info('[INFO]: Server closed.');
      process.exit(err ? 1 : 0);
    });
  });
}).catch((error) => {
  console.error('[ERROR]: Failed to connect to DB:', error);
  process.exit(1);
});
