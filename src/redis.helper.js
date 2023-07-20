const redis = require("redis");
const client=redis.createClient(process.env.REDIS_URL);

const setJWT = async(key, value) => {
    
    return new Promise((resolve, reject) => {
      client.set(key, value, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };


const getJWT = async (key) => {
    console.log("connected");
      return new Promise((resolve, reject) => {
        client.get(key, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }
  

const deleteJWT=(key)=>{
  try{
    client.del(key);
  }catch(error){
    console.log(error);
  }
};

module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};