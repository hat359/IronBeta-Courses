import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import rateLimit from 'express-rate-limit';
import { config } from './config/config';
import { errorHandler } from './middleware/errorMiddleware';
import connectDB from './models/db';
import courseRouter from './routes/courseRoutes';

const app: Express = express();

console.log("config: ", config);

// Helmet is used to secure this app by configuring the http-headers
app.use(helmet());

// Cookie parser to parse cookies
app.use(cookieParser());

// Parse JSON request body
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS with specific configurations
app.use(cors({
    origin: config.cors_origin,
    credentials: true,
}));

// // Rate limiting middleware to limit repeated requests to public APIs
// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: 'Too many requests from this IP, please try again after 15 minutes'
// });

// Apply rate limiting to all requests
// app.use('/api/', apiLimiter);

// Connect to MongoDB
connectDB().then(() => {
    // Define routes
    app.use('/api/v1/courses', courseRouter);

    // Error handling middleware
    app.use(errorHandler);

    // Start the server
    const PORT = config.port || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

export default app;
