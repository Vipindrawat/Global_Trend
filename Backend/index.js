import express from 'express'
const app = express();

import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI);

import cors from 'cors'
app.use(cors());

import AuthenticationMiddleware from './Middleware/AuthenticationMiddleware.js';
import UserRoutes from './Routes/UserRoutes.js'
import TaskRoutes from './Routes/TaskRoutes.js'
app.use(express.json())

app.use('/api/auth', UserRoutes);
app.use(AuthenticationMiddleware);
app.use('/api/task', TaskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at PORT : ${PORT}`);
})