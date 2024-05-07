const mongoose = require('mongoose');

const ForgotPasswordOtpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    expiration_time: {
        type: Date,
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
    },
    updatedAt: {type: Date, default: Date.now },
    createdAt: {type: Date, default: Date.now }
});

const ForgotPasswordOtp = mongoose.model('ForgotPasswordOtp', ForgotPasswordOtpSchema);

module.exports = ForgotPasswordOtp;
