const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    Email: {
        type: String,
        default: null,
        required: false
    },
    Name: {
        type: String,
        default: null,
        required:false
    },
    PhoneId: {
        type: String,
        default: null,
        required:false
    },
    PhoneVerified: {
        type: Boolean,
        default: false
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('User', userSchema)