const {ResetPinSchema}=require("./ResetPin.schema")
const {token} = require("morgan")

const genNumber=()=>{
    var pin=""
    for(let i=0;i<6;i++){
       pin+=Math.floor(Math.random()*10)
    }
    return pin;
}
const setPasswordResetPin=(email)=>{
    
    const Rpin=genNumber();

    const resetObj={
        email,
        pin:Rpin
    }
    console.log(resetObj)
    return new Promise((resolve,reject)=>{
        ResetPinSchema(resetObj)
        .save()
        .then((data)=>resolve(data))
        .catch((error)=>reject(error));
        });
    }
    

module.exports={
    setPasswordResetPin,
};