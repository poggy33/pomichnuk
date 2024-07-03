import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Будь-ласка вкажіть і'мя"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Будь-ласка вкажіть пошту"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Будь-ласка вкажіть пароль"],
    },
    phone: {
        type: String,
        required: [true, "Будь-ласка вкажіть телефон"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;