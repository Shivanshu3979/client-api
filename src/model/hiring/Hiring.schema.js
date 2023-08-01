const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HiringSchema = new Schema({
    clientId:{
        type:Schema.Types.ObjectId
    },
    name:{
        type: String,
        maxlength: 100,
        required: true,
        default:"NA"
    },
    roleApplied:{
        type: String,
        maxlength: 100,
        required: true,
        default:"NA"
    },
    email:{
        type: String,
        maxlength: 100,
        required: true,
        default:"NA"
    },
    education: {
        type: String,
        maxlength: 100,
        required: true,
        default:"NA"
    },
    summary: {
        type: String,
        maxlength: 1000,
        required: true,
        default:"NA"
    },
    skill1: {
        type: String,
        maxlength: 100,
        required: true,
        default:"NA"
    },
    skill2: {
        type: String,
        maxlength: 100,
        required: true,
        default:"NA"
    },
    skill3: {
        type: String,
        maxlength: 100,
        required: true,
        default:"NA"
    },
    languages: {
        type: String,
        maxlength: 400,
        required: true,
        default:"NA"
    },
    workexp: {
        type: Number,
        required: true,
        default:"0"
    },
    linkedin: {
        type: String,
        required: true,
        default:"NA"
    },
    others: {
        type: String,
        required: true,
        default:"NA"
    },
    stage1: [{
        title:{
        type: String,
        required: true,
        default:"NA"
    },
    status:{
        type: String,
        required: true,
        default:"Not Reviewed"
    }
}],
    stage2: [{
        title:{
        type: String,
        required: true,
        default:"NA"
    },
    status:{
        type: String,
        required: true,
        default:"Not Reviewed"
    }
}],
    stage3: [{
        title:{
        type: String,
        required: true,
        default:"Not Reviewed"
    },
    status:{
        type: String,
        required: true,
        default:"Not Reviewed"
    }
}],
    openAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        require:true,
        default:Date.now(),
    },
    status: {
        type: String,
        maxlength: 50,
        required: true,
        default:"Not Reviewed"
    }
});

module.exports = {
    HiringSchema: mongoose.model('Hiring', HiringSchema)
};
