import mongoose from 'mongoose'

const userCollection = "Users"

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    first_name: {type: String , required: true},
    last_name: {type: String , required: true},
    email: { type: String, unique: true },
    age: Number,
    role:{type: String , required: true},
    password: {type: String , required: true},
=======
    first_name: String ,
    last_name: String ,
    email: { type: String, unique: true },
    age: Number,
    role: String ,
    password: String ,
>>>>>>> 87de8b7e020addaece4965604460803075eb93b2
    role: {type: String, enum:['admin','user'], default:'user'}
})

const firstCollection = mongoose.model(userCollection, userSchema)

export default firstCollection
