import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing user order from front end
const placeOrder = async (req, res) => {

    const frontEndUrl = 'http://localhost:5173';


    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        // updating user orders
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        // payment processing
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100,
            },
            quantity:item.quantity,
        }))
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2*100,
            },
            quantity:1,
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url:`${frontEndUrl}/verify?success=true&oderId=${newOrder._id}`,
            cancel_url:`${frontEndUrl}/verify?success=false&oderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const verifyOrder = async(req,res)=>{
    const{orderId,success} =req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        } else{
            await orderModel.findByIdAndDelete(orderId;
            res.json({successs:false,message:"Not Paid"})
        }
    } catch(error){
        res.json({success:false,message:"Error try to check your code in odercontroller",error})

    }

}

//users order for front end
const usersOrder = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})

    } catch(error){
        res.json({success:false, message:"error getting the user order",error})

    }
}

// listing orders in admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch(error){
        res.json({success:false,message:"Error getting the orders",error})
    }

    // api for updating oder status
    const updateStatus = async(req,res)=>{
        try {
            await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
            res.json({success:true,message:"status updated"})
        }catch(error){
            res.json({success:false,message:"Error",error})
        }
    }

}

export { placeOrder,verifyOrder,usersOrder,listOrders,updateStatus}