const mongoose = require("mongoose");

const tuitionSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  tuitionPaid: {
    type: Number,
  },
  totalTuitionFee: {
    type: Number,
  },
  tuitionDues: {
    type: Number,
  },
});

const tuition = new mongoose.model("tuition", tuitionSchema);

module.exports = tuition;
