import express from 'express';
import {addDrinks,listDrinks, removeDrinks} from "../controllers/drinksController.js";
import multer from "multer";

const drinksRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})
const upload = multer({storage:storage});

drinksRouter.post("/add",upload.single("image"),addDrinks);
drinksRouter.get("/list",listDrinks)
drinksRouter.post("/remove",removeDrinks);


export default drinksRouter;