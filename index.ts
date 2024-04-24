import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorMiddleware';
import connectDB from './models/db';
import router from './routes/courseRoutes';



const app: Express = express();
app.use(express.json())
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = 3000;
connectDB()
    // Define routes
    app.use('/api/v1/courses', router);
    
  
    // Error handling middleware
    app.use(errorHandler);
  
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
//   }).catch(err => {
//     console.error('Error connecting to MongoDB:', err);
//   });

export default app