import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import foodRoutes from './routes/foodRoutes.js'


connectDB();

const app = express();

app.use(express.json()); //Note: To parse raw json
app.use(express.urlencoded({ extended: true })); //Note: To send form data
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.get('/', (req, res) => res.send('server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));