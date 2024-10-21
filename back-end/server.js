import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import drinksRouter from './routes/drinksRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import 'dotenv/config.js';

//app config
const app = express();
const port = 4000

//middlewares
app.use(express.json());
app.use(cors());

// database connection from config file
connectDB();

//API endpoints
app.use("/api/drinks",drinksRouter);
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

//api routes
app.get("/",(req,res)=> {
    res.send("API is running...");
})

//listener
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})

