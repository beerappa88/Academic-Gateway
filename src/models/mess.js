const mongoose = require("mongoose");

const messSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  messPaid: {
    type: Number,
  },
  totalmessFee: {
    type: Number,
  },
  messDues: {
    type: Number,
  },
});

const mess = new mongoose.model("mess", messSchema);

module.exports = mess;
