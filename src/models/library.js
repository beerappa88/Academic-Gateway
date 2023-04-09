const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  totallibraryFee: {
    type: Number,
  },
  libraryPaid: {
    type: Number,
  },
  libraryDues: {
    type: Number,
  },
});

const library = new mongoose.model("library", librarySchema);

module.exports = library;