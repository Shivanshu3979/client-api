const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetPinSchema = new Schema({
    pin: {
        type: String,
        maxlength: 6,
        minlength:6,
    },
    email: {
        type: String,
        maxlength: 100,
        required: true
    },
});

module.exports = {
    ResetPinSchema: mongoose.model('ResetPin', ResetPinSchema)
};
