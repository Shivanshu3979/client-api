const express=require("express")
const {route}=require("./ticket.router");
const router=express.Router();
const bcrypt=require('bcrypt');
const saltRounds=10;

const {insertUser, getUserByEmail, getUserById, updatePassword}=require("../model/user/User.model");
const {createAccessJWT,createRefreshJWT}=require("../jwt.helper");
const { userAuthorization } = require("../middlewares/authorization.middleware");
const { setPasswordResetPin, getPinByEmailPin, deletePinByEmailPin } = require("../model/resetPin/ResetPin.model");
const { emailProcessor } = require("../email.helper");
const { resetPassValidation, updatePassValidation } = require("../middlewares/formValidation.middleware");

router.all('/',(req,res,next)=>{
    //res.json({message:"return form user router"});
    next();
});
const hashPassword=(pwd)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pwd, salt);
}
router.post('/',async(req,res)=>{
    const {name,email,username,password,role}=req.body;

    try{
        console.log(password);
        const hashedPass=await hashPassword(password);
        const userObj={
            name,
            email,
            username,
            password:hashedPass,
            role
        }
        const result=await insertUser(userObj);
        console.log(result);
        res.json({message:"New user created", result});
    }catch(error){
        console.log(error);
        res.json({status:"error", message:error.message})
    }
    
});

const passMatch=(p,hash)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(p,hash,(err,result)=>{
            if(err)reject(err);
            resolve(result);
        })
    })
}
//user signin
router.post("/login",async(req,res)=>{
    const {username,password}=req.body
    if(!username || !password){
        res.json({status:"error", message:"Invalid Form Data"});
    }
    const user=await getUserByEmail(username);
    const dat_pass=user && user._id ? user.password:null;
    if(!dat_pass){
        return res.json({status:"error", message:"Invalid Username or password"});
    }

    const result=await passMatch(password,dat_pass);
    if(!result){
        return res.json({status:"error", message:"Invalid Username or password"});
    }

    const accessJWT= await createAccessJWT(user.username, `${user._id}`);
    const refreshJWT=await createRefreshJWT(user.username, `${user._id}`);
    
    
    res.json({
        status:"success", 
        message: "Login Successfully!",
        accessJWT,
        refreshJWT});
    
   })

router.get("/", userAuthorization,async(req,res)=>{
    const _id=req.userID;
    const profile=await getUserById(_id);
    res.json({profile});
})

router.post('/reset-password', resetPassValidation, async(req,res)=>{
    const{email}=req.body;
    if(!email){
        return res.json({message:"Invalid email", access:"forbidden"})
    }
    const user=await getUserByEmail(email);
    console.log(user.email)
    if(user && user._id && user.email){
        //6 digit pin 
        const setPin=await setPasswordResetPin(user.email)
        const result = await emailProcessor(user.email,user.username,setPin.pin,"request-new-pass");

        if(result.messageId){
            return res.json({
                status:"Success",
                message:
                "If the email is present in our database, the password reset pin will be sent soon"
            })
        }

        return res.json({
            status:"error",
            message: "Unable to send Email"
        });
    }
    res.json({status:"error", message:"if the email is associated with your username the password reset pin will sent shortly"});
})

router.patch('/reset-password', updatePassValidation,async(req,res)=>{
    const {email, pin, newPassword} = req.body
    const user = await getUserByEmail(email);
    const getPin = await getPinByEmailPin(user.email,pin);

    if(getPin._id){
        const dbDate=getPin.addedAt;
        let expDate=dbDate.setDate(dbDate.getDate()+1);
        const today=new Date()
        if(today>expDate){
            return res.json({
                status:"error",
                message:"Invalid Pin or the Pin Has expired, try generating new PIN"
            })
        }

        const hash = await hashPassword(newPassword);
        const result = await updatePassword(user._id,hash);
        const mail_result = await emailProcessor(user.email,user.username,pin,"password-update-success");
        console.log(mail_result);
        if(result._id && mail_result.messageId){
            deletePinByEmailPin(user.email,pin);
            return res.json({
                status:"success",
                message: "Your password is updated"
            })
        }
    }
    res.json({
        status:"error",
        message:"unable to update your password, please try again later"
    });

})

 module.exports=router;
