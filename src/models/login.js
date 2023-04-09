const mongoose = require("mongoose");

const LogInSchema = new mongoose.Schema({
  rollno: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const login = new mongoose.model("login", LogInSchema);

module.exports=login;
