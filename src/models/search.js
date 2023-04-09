const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema({
    name: String,
    age: Number
});