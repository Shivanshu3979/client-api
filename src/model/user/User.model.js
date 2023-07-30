const {UserSchema}=require("./User.schema")
const insertUser=(userObj)=>{
    return new Promise((resolve,reject)=>{
        console.log(userObj);
        UserSchema(userObj)
        .save()
        .then((data)=>resolve(data))
        .catch((error)=>reject(error));
        });
    }
    
const getUserByEmail = (email,username) =>{
    if(email){
        return new Promise(async (resolve,reject)=>{
            console.log("email: ",email)
            if(!email) return false
            try {
                UserSchema.findOne({email}).then((data)=>{
                    resolve(data);
                })
            } catch (error) {
               console.error(error);
            }
        })
    }
    return new Promise(async (resolve,reject)=>{
        console.log(username)
        if(!username) return false
        try {
            UserSchema.findOne({username}).then((data)=>{
                resolve(data);
            })
        } catch (error) {
           console.error(error);
        }
    })
}
const getUserById = (_id) =>{
    return new Promise(async (resolve,reject)=>{
        if(!_id) return false
        try {
            UserSchema.findOne({_id}).then((data)=>{
                resolve(data);
            })
        } catch (error) {
           console.error(error);
        }
    })
}

const storeUserRefreshJWT=(_id,token)=>{
    return new Promise((resolve,reject)=>{
        try {
            UserSchema.findByIdAndUpdate(
                {_id},
                {$set:{"refreshJWT.token":token,
            "refreshJWT.addedAt":Date.now()},},
                {new:true}).then(data=>resolve(data))
                .catch(error=>{reject(error)})
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}

const updatePassword=(_id,password)=>{
    return new Promise((resolve,reject)=>{
        try {
            UserSchema.findByIdAndUpdate(
                {_id},
                {$set:{"password":password}},
                {new:true}).then(data=>resolve(data))
                .catch(error=>{reject(error)})
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


module.exports={
    insertUser,
    getUserByEmail,
    getUserById,
    storeUserRefreshJWT,
    updatePassword,
};