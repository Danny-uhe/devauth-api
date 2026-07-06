const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, "Email must be unique"],
        minlength: [5, "Email must be at least 5 characters long"],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters long"],
        trim: true,
        select: false,
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
        select: false,
    },
    verificationCodeValidation:{
        type: Number,
        select: false,
    },
    forgotPasswordCode:{
        type: String,
        select: false,
    },
    forgotPasswordCodeValidation:{
        type: Number,
        select: false,
    },
}, {
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);