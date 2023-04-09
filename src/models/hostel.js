const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  hostelPaid: {
    type: Number,
  },
  totalhostelFee: {
    type: Number,
  },
  hostelDues: {
    type: Number,
  },
});

const hostel = new mongoose.model("hostel", hostelSchema);

module.exports = hostel;
