import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://adrewchan:NRTqsHxOgWqarFen@cluster0.2semn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Database connected successfully");
    })
}