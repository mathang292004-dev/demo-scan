const mongoose = require('mongoose');


export const UserSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }
})