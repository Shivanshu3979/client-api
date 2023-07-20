const {ResetPinSchema}=require("./ResetPin.schema")
const {token} = require("morgan")

const genNumber=()=>{
    var pin=""
    for(let i=0;i<6;i++){
       pin+=Math.floor(Math.random()*10)
    }
    return pin;
}

const getPinByEmailPin = (email, pin) => {
    return new Promise((resolve, reject) => {
      try {
        ResetPinSchema.findOne({ email, pin })
          .exec()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            console.log(error);
            resolve(false);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  
const deletePinByEmailPin = (email, pin) => {

      try {
        ResetPinSchema.findOneAndDelete({ email, pin })
          .exec()
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
  };

const setPasswordResetPin=(email)=>{
    
    const Rpin=genNumber();

    const resetObj={
        email,
        pin:Rpin
    }
    
    return new Promise((resolve,reject)=>{
        ResetPinSchema(resetObj)
        .save()
        .then((data)=>resolve(data))
        .catch((error)=>reject(error));
        });
    }
    

module.exports={
    setPasswordResetPin,
    getPinByEmailPin,
    deletePinByEmailPin,
};