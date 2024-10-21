import jwt from 'jsonwebtoken';



const authMiddlware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message: "Not Authorized login again"});
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded;
        next();
    } catch (error) {
        return res.json({success:false, message: "Not Authorized login again", error});
    }
}

export default authMiddlware;