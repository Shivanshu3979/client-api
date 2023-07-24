const express=require("express");
const { insertTicket, getTickets, getTicketsById, updateClientReply, updateStatusClose, deleteTicket } = require("../model/ticket/Ticket.model");
const { userAuthorization } = require("../middlewares/authorization.middleware");
const router=express.Router();

router.all('/', (req,res,next)=>{
    //res.json({message:"return form ticket router"});

    next();
});

router.post("/", userAuthorization, async(req,res)=>{

    try {
        const {subject, sender, message}=req.body
        const userId=req.userID
    const ticketObj = {
        clientId: userId,
        subject,
        conversations:[
            {
                sender,
                message
            },
        ],
    };

    const result = await insertTicket(ticketObj);
    if(result._id){
        return res.json({
            status:"success",
            message:"New ticket has been created"
        });
    }

    res.json({
        status:"error",
        message:"Unable to create the ticket, please try again later"
    });

    } catch (error) {
        res.json({
            status:"error",
            message:error.message
        });
    }
    
})

router.get("/",userAuthorization, async(req,res)=>{
    try{
        const userId=req.userID;
        const result=await getTickets(userId);

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

router.get("/:ticketId",userAuthorization, async(req,res)=>{
    const {ticketId} = req.params;
    try{
        const result=await getTicketsById(ticketId);

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

router.put("/:ticketId",userAuthorization, async(req,res)=>{
    try {
        const {message, sender} = req.body;
        const {ticketId } = req.params;

        const result = await updateClientReply(ticketId,message,sender);

        if(result._id){
            return res.json({
                status:"success",
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

router.patch("/close-ticket/:ticketId",userAuthorization, async(req,res)=>{
    try {
        const {ticketId } = req.params;
        const clientId=req.userID;

        const result = await updateStatusClose(ticketId,clientId);

        if(result._id){
            return res.json({
                status:"success",
                message:"Message added to conversation"
            });
        }
        
    } catch (error) {
        res.json({
            status:"error",
            message:error.message
        })
    }
    
})

router.delete("/:ticketId",userAuthorization, async(req,res)=>{
    try {
        const {ticketId } = req.params;
        const clientId=req.userID;

        const result = await deleteTicket(ticketId,clientId);

        if(result._id){
            return res.json({
                status:"success",
                message:"Ticket has been deleted successfully",
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