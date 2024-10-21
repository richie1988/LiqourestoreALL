import userModel from '../models/userModel.js';

// Add  items to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData});
        res.json({ success: true, message: "Item added to cart" }); 
    } catch (error) {
        res.json({ success: false, message: "Item not added to cart", error });
    }

}

// Remove item from cart
const removeFromCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData});
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        res.json({ success: false, message: "Item not removed from cart", error });
    }
}

// Get user cart items
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, message: "Cart items found", cartData });

    } catch (error) {
        res.json({ success: false, message: "Cart items not found", error });
    }
}

export { addToCart, removeFromCart, getCart };