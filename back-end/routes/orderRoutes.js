import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { placeOrder,verifyOrder,usersOrder,listOrders,updateStatus } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);

orderRouter.post("/verify",verifyOrder)

orderRouter.post("/usersorder",authMiddleware,usersOrder)

orderRouter.get("/list",listOrders)

orderRouter.post("/status",updateStatus)

export default orderRouter;