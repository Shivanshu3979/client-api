const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        maxlength: 100,
        required: true
    },
    username: {
        type: String,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        maxlength: 256,
        required: true
    },
    role: {
        type: String,
        maxlength: 50,
        required: true
    },
    refreshJWT:{
        token:{
            type:String,
            maxlength:500,
            default:''
        },
        addedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
});

module.exports = {
    UserSchema: mongoose.model('users_table', UserSchema)
};
