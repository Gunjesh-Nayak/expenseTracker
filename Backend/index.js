import express from "express";
import dotenv from 'dotenv';
import connectDB from "./src/DB/db.js";
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.route.js';
import expenseRouter from './src/routes/expense.route.js';
import cors from "cors";
import userRouter from "./src/routes/user.route.js";



const app=express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use('/api/auth',authRouter);
app.use('/api/expense',expenseRouter);
app.use('/api/user',userRouter);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
export default app;