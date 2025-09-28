import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{type: String, required:true},
    fullName:{type: String, required:true},
    phoneNumber:{type: String, required:true},
    postalcode:{type: Number, required:true},
    area:{type: String, required:true},
    district:{type: String, required:true},
    province:{type: String, required:true},
})
const Address = mongoose.model.Address || mongoose.model('address',addressSchema)

export default Address