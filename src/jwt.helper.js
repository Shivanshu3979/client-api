const jwt=require('jsonwebtoken');
const redis = require("redis");
const client = redis.createClient({ host: 'localhost', port: 6379 });

const {setJWT,getJWT} = require("./redis.helper")
const {storeUserRefreshJWT} = require("./model/user/User.model")

const createAccessJWT=async(email,_id)=>{
    try {
        const accessJWT= await jwt.sign({email}, 
            process.env.JWT_ACCESS_SECRET,
            {expiresIn:'15m'}
            );
            await setJWT(accessJWT,_id);
            return Promise.resolve(accessJWT);
    } catch (error) {
        return Promise.reject(error);
    }
}

const createRefreshJWT=async (payLoad,_id)=>{
    try {
        const refreshJWT=jwt.sign({payLoad}, 
            process.env.JWT_ACCESS_SECRET,
            {expiresIn:'30d'}
            );
            await storeUserRefreshJWT(_id,refreshJWT);
            return Promise.resolve(refreshJWT);
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
    
}

module.exports={
    createAccessJWT,
    createRefreshJWT,
}
