const express=require("express");
const { insertHiring, getHirings, getHiringsById, updateClientReply, updateStatusClose, deleteHiring } = require("../model/hiring/Hiring.model");
const { userAuthorization } = require("../middlewares/authorization.middleware");
const { createNewHiringValidation } = require("../middlewares/formValidation.middleware");
const router=express.Router();

router.all('/', (req,res,next)=>{
    //res.json({message:"return form Hiring router"});

    next();
});

//create new Hiring
router.post("/",createNewHiringValidation,userAuthorization, async(req,res)=>{

    try {
        const {
            roleApplied,
            email,
            name,
            education,
            skill1,
            skill2,
            skill3,
            languages,
            workexp,
            linkedin,
            summary,
            others,
            stage1,
            stage2,
            stage3,
            stauts,
        }=req.body
        const userId=req.userID
    const HiringObj = {
        clientId: userId,
        roleApplied,
            email,
            name,
            education,
            skill1,
            skill2,
            skill3,
            languages,
            workexp,
            linkedin,
            summary,
            others,
            stage1:[{
                title:stage1,
                stat:"Not Reviewed",
            }],
            stage2:[{
                title:stage2,
                stat:"Not Reviewed",
            }],
            stage3:[{
                title:stage3,
                stat:"Not Reviewed",
            }],
            stauts,
    };

    const result = await insertHiring(HiringObj);
    if(result._id){
        return res.json({
            status:"success",
            message:"New Hiring has been created"
        });
    }

    res.json({
        status:"error",
        message:"Unable to create the Hiring, please try again later"
    });

    } catch (error) {
        res.json({
            status:"error",
            message:error.message
        });
    }
    
})

//get all Hirings for a specific user
router.get("/",userAuthorization, async(req,res)=>{
    try{
        const userId=req.userID;
        const result=await getHirings(userId);
        console.log(result);
        if(result.length){
            return res.json({
                status:"success",
                result,
            });
        }
       
    }catch(error){
        console.log(error);
    }
})

//update Hirings for a specific user
router.get("/:HiringId",userAuthorization, async(req,res)=>{
    const {HiringId} = req.params;
    try{
        const result=await getHiringsById(HiringId);

        if(result.length){
            return res.json({
                status:"success",
                result,
            });
        }
       
    }catch(error){
        console.log(error);
    }
})

//update reply message from client
router.put("/:HiringId",userAuthorization, async(req,res)=>{
    try {
        console.log(req.body);
        const {stage1,stage2,stage3,status} = req.body;
        const {HiringId } = req.params;

        const result = await updateClientReply(HiringId,stage1,stage2,stage3,status);
        if(result._id){
            return res.json({
                status:"success",
                message:"Message updated successfully",
                result,
            });
        }
        
    } catch (error) {
        res.json({
            status:"error",
            message:error.message
        })
    }  
})

//update Hiring status to close
router.patch("/close-application/:HiringId",userAuthorization, async(req,res)=>{
    try {
        const {HiringId } = req.params;
        const clientId=req.userID;

        const result = await updateStatusClose(HiringId,clientId);

        if(result._id){
            return res.json({
                status:"success",
                message:"Hiring Closed Succesfully"
            });
        }
        
    } catch (error) {
        res.json({
            status:"error",
            message:error.message
        })
    }
    
})

//update Hiring status to close
router.post("/sendletter/:HiringId",userAuthorization, async(req,res)=>{
    try {
        const {HiringId } = req.params;
        const clientId=req.userID;

        console.log(HiringId);
    } catch (error) {
        res.json({
            status:"error",
            message:error.message
        })
    }
    
})

//delete a Hiring
router.delete("/:HiringId",userAuthorization, async(req,res)=>{
    try {
        const {HiringId } = req.params;
        const clientId=req.userID;

        const result = await deleteHiring(HiringId,clientId);

        if(result._id){
            return res.json({
                status:"success",
                message:"Hiring has been deleted successfully",
            });
        }
        
    } catch (error) {
        res.json({
            status:"error",
            message:error.message
        })
    }
    
})
module.exports=router;