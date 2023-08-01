const {HiringSchema} = require("./Hiring.schema");
const mongoose = require('mongoose');


const insertHiring = (HiringObj) =>{
    return new Promise((resolve,reject)=>{
        try {
            HiringSchema(HiringObj)
            .save()
            .then(data=>resolve(data))
            .catch(error=>reject(error));
        } catch (error) {
            reject(error);
        }
    });
};

const getHirings = (clientId) => {
    return new Promise((resolve, reject) => {
      HiringSchema
        .find({ "clientId": `${clientId}` })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

const getHiringsById = (_id) => {
    return new Promise((resolve, reject) => {
      HiringSchema
        .find({ "_id": `${_id}` })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };

const updateClientReply = (_id,stage1,stage2,stage3,status) => {
    return new Promise((resolve, reject) => {
      HiringSchema
        .findOneAndUpdate(
          { "_id": `${_id}` },
          {
            status:"pending",
            updatedAt:Date.now(),
            stage1,
            stage2,
            stage3,
            status,
          },
          {new:true},)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };
  
const updateStatusClose = (HiringId,clientId) => {
    return new Promise((resolve, reject) => {
      HiringSchema
        .findOneAndUpdate(
          { "_id": `${HiringId}`,clientId, },
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

const deleteHiring = (HiringId,clientId) => {
    return new Promise((resolve, reject) => {
      HiringSchema
        .findOneAndDelete(
          { "_id": `${HiringId}`,clientId, })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  };
  

module.exports={
    insertHiring,
    getHirings,
    getHiringsById,
    updateClientReply,
    updateStatusClose,
    deleteHiring,
}