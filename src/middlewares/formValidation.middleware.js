const joi=require("joi");

const email=joi.string().email({
    minDomainSegments:2,
    tlds:{allow:["com","net","in"]}
})

const pin=joi.string().min(6).max(6);

const newPassword=joi.string().alphanum().min(3).max(30).required();


const resetPassValidation=(req,res,next)=>{
    const schema=joi.object({email})
    const value = schema.validate(req.body)
    if(value.error){
        return res.json({
            status:"error",
            message: value.error.message
        })
    }
    next();
}
const updatePassValidation=(req,res,next)=>{
    const schema=joi.object({email,pin,newPassword});
    const value = schema.validate(req.body)
    if(value.error){
        return res.json({
            status:"error",
            message: value.error.message
        })
    }
    next();
}

module.exports={
    resetPassValidation,
    updatePassValidation
}