const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    phone: {type: String},
    address: {type: String},
    country: {type: String},
})


module.exports = mongoose.model('user', userSchema)