const joi=require("joi");

const email=joi.string().email({
    minDomainSegments:2,
    tlds:{allow:["com","net","in"]}
})

const link=joi.string().uri();
const optional=joi.string().min(0);

const pin=joi.string().min(6).max(6);
const exp=joi.string().min(1).max(2);
const newPassword=joi.string().min(3).max(30).required();
const shortString=joi.string().min(2).max(100).required();
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
const createNewHiringValidation=(req,res,next)=>{
    const schema=joi.object({
        roleApplied:shortString,
        email:email,
        name:shortString,
        education:longString,
        skill1:shortString,
        skill2:shortString,
        skill3:shortString,
        languages:shortString,
        workexp:exp,
        linkedin:link,
        summary:longString,
        others:optional,
        stage1:optional,
        stage2:optional,
        stage3:optional,
        status:optional
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
    createNewHiringValidation,
}