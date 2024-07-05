import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Будь-ласка вкажіть пошту"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Будь-ласка вкажіть пароль"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
    rate: {
        type: String,
        default: "0",
    }, 

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;