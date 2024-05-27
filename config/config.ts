import dotenv from 'dotenv';
import path from 'path';
// Load environment variables from .env file
dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/yourDatabaseName",
    cors_origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    jwt: {
        secret: process.env.JWT_SECRET || 'yourJWTSecretKey',
        expire: process.env.JWT_EXPIRE || '30d'
    }
};
