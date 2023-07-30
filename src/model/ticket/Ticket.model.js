const {TicketSchema} = require("./Ticket.schema");
const mongoose = require('mongoose');


const insertTicket = (ticketObj) =>{
    return new Promise((resolve,reject)=>{
        try {
            TicketSchema(ticketObj)
            .save()
            .then(data=>resolve(data))
            .catch(error=>reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const getTickets = (clientId) => {
  console.log(clientId);
    return new Promise((resolve, reject) => {
      TicketSchema
        .find({ "clientId": `${clientId}` })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

const getTicketsById = (_id) => {
    return new Promise((resolve, reject) => {
      TicketSchema
        .find({ "_id": `${_id}` })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

const updateClientReply = (_id,message,sender) => {
    return new Promise((resolve, reject) => {
      TicketSchema
        .findOneAndUpdate(
          { "_id": `${_id}` },
          {
            status:"pending",
            updatedAt:Date.now(),
            $push:{
              conversations:{message,sender},
            }
          },
          {new:true},)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };
  
const updateStatusClose = (ticketId,clientId) => {
    return new Promise((resolve, reject) => {
      TicketSchema
        .findOneAndUpdate(
          { "_id": `${ticketId}`,clientId, },
          {
            status:"Closed",
            updatedAt:Date.now(),
          },
          {new:true},)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

const deleteTicket = (ticketId,clientId) => {
    return new Promise((resolve, reject) => {
      TicketSchema
        .findOneAndDelete(
          { "_id": `${ticketId}`,clientId, })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };
  

module.exports={
    insertTicket,
    getTickets,
    getTicketsById,
    updateClientReply,
    updateStatusClose,
    deleteTicket,
}