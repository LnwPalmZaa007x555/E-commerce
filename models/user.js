import mongoose from "mongoose";


const userSchemas = new mongoose.Schema({
    _id: { type : String, required:true },
    name: { type : String, required:true },
    email: { type : String, required:true, unique:true },
    imageUrl : { type : String, required:true },
    cartItems : { type : Object, default:{} }
}, {minimize: false})

const User = mongoose.model.user || mongoose.model('user', userSchemas)

export default User

