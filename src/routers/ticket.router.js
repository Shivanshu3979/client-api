const express=require("express");
const { insertTicket, getTickets, getTicketsById, updateClientReply, updateStatusClose, deleteTicket } = require("../model/ticket/Ticket.model");
const { userAuthorization } = require("../middlewares/authorization.middleware");
const { createNewTicketValidation, replyTicketMessageValidation } = require("../middlewares/formValidation.middleware");
const router=express.Router();

router.all('/', (req,res,next)=>{
    //res.json({message:"return form ticket router"});

    next();
});

//create new ticket
router.post("/",createNewTicketValidation,userAuthorization, async(req,res)=>{

    try {
        const {subject, email, name, sender, message}=req.body
        const userId=req.userID
    const ticketObj = {
        clientId: userId,
        subject,
        email,
        name,
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

//get all tickets for a specific user
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

//update tickets for a specific user
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

//update reply message from client
router.put("/:ticketId",replyTicketMessageValidation,userAuthorization, async(req,res)=>{
    try {
        const {message, sender} = req.body;
        const {ticketId } = req.params;

        const result = await updateClientReply(ticketId,message,sender);
        console.log(result);
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

//update ticket status to close
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

//delete a ticket
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