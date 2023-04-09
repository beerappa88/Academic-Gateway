const mongoose = require("mongoose");
// const validator = require("validator");

const StudentSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  phone: {
    type: Number,
    required: true,
    // min: 10,
  },
  branch: {
    type: String,
    required: true,
    minLength: 3,
  },
  batch: {
    type: Number,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Invalid email id");
    //   }
    // },
  },
  programme: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const Student = new mongoose.model("Student", StudentSchema);

module.exports = Student;
