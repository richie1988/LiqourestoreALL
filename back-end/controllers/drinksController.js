import drinksModel from "../models/drinksModel.js";
import fs from "fs";

// add drinks item to the database
const addDrinks = async (req, res) => {
    
    let image_filename = `${req.file.filename}`;

    const drinks = new drinksModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })
    try {
        await drinks.save();
        res.json({success:true, message: "drinks added"})
    } catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}
// all drinks list

const listDrinks = async(req, res)=>{
    try{
        const drinks = await drinksModel.find({});
        res.json({success: true, data:drinks})
    } catch(error){
        console.log(error)
        res.json({success: false, message:"Error"})

    }
}
// remove drinks items
const removeDrinks = async(req,res)=> {
    try {
        const drinks = await drinksModel.findById(req.body.id);
        fs.unlink(`uploads/${drinks.image}`,()=>{})
        await drinksModel.findByIdAndDelete(req.body.id);
        res.json({sucess: true, message: "drinks removed"})
    } catch(error){
        console.log(error)
        res.json({success: false, message: error})

    }
}
export {addDrinks, listDrinks,removeDrinks};