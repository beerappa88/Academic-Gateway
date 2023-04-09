const mongoose = require("mongoose");

const adminLogInSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const adminlogin = new mongoose.model("adminlogin", adminLogInSchema);

module.exports=adminlogin;
