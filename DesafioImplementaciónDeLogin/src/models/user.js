import mongoose from 'mongoose'

const userCollection = "Users"

const userSchema = new mongoose.Schema({
    first_name: {type: String , required: true},
    last_name: {type: String , required: true},
    email: { type: String, unique: true },
    age: Number,
    role:{type: String , required: true},
    password: {type: String , required: true},
    role: {type: String, enum:['admin','user'], default:'user'}
})

const firstCollection = mongoose.model(userCollection, userSchema)

export default firstCollection
