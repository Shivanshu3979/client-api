const express=require("express")
const {route}=require("./ticket.router");
const router=express.Router();
const bcrypt=require('bcrypt');
const saltRounds=10;

const {insertUser, getUserByEmail, getUserById}=require("../model/user/User.model");
const {createAccessJWT,createRefreshJWT}=require("../jwt.helper");
const { userAuthorization } = require("../middlewares/authorization.middleware");

router.all('/',(req,res,next)=>{
    //res.json({message:"return form user router"});
    next();
});
const hashPassword=(pwd)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pwd, salt);
}
router.post('/',async(req,res)=>{
    const {name,username,password,role}=req.body;

    try{
        console.log(password);
        const hashedPass=await hashPassword(password);
        const userObj={
            name,
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

module.exports=router;