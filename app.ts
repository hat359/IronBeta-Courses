import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { config } from './config/config';
import { errorHandler } from './middleware/errorMiddleware';
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

// Sanitize user inputs to prevent NoSQL injection
app.use(mongoSanitize());

// Define routes
app.use('/api/v1/courses', courseRouter);

// Error handling middleware
app.use(errorHandler);

export default app;
