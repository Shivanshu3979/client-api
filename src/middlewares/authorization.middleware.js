const {verifyAccessJWT} = require("../jwt.helper")
const {getJWT} = require("../redis.helper")

const userAuthorization=async(req,res,next)=>{
    const {authorization} = req.headers;
    const decoded=await verifyAccessJWT(authorization);
    if(decoded.email){
        const userId=await getJWT(authorization);
        if(!userId){
            return res.status(403).json({message:"Forbidden"});
        }

        req.userID=userId;
        return next();
    }
    return res.status(403).json({message:"Forbidden"});
}

module.exports={
    userAuthorization,
}