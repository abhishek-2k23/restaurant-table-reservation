import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
        unique: true,
    }
}, {timestamps: true})

const User = new mongoose.model('User', UserSchema);
export default User;