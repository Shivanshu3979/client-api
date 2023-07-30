const joi=require("joi");

const email=joi.string().email({
    minDomainSegments:2,
    tlds:{allow:["com","net","in"]}
})

const pin=joi.string().min(6).max(6);
const newPassword=joi.string().min(3).max(30).required();
const shortString=joi.string().min(2).max(50).required();
const longString=joi.string().min(2).max(1000).required();

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

const createNewTicketValidation=(req,res,next)=>{
    const schema=joi.object({
        subject:shortString,
        email:email,
        name:shortString,
        sender:shortString,
        message:longString
    })
    const value=schema.validate(req.body);
    if(value.error){
        console.log(value);
        return res.json({
            status:"error",
            message:value.error.message,
            response:req.body,
        });
    }
    next();
}

const replyTicketMessageValidation=(req,res,next)=>{
    const schema=joi.object({
        sender:shortString,
        message:longString
    })

    const value=schema.validate(req.body);
    if(value.error){
        return res.json({
            status:"error",
            message:value.error.message
        });
    }
    next();
}

module.exports={
    resetPassValidation,
    updatePassValidation,
    createNewTicketValidation,
    replyTicketMessageValidation,
}