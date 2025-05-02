const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
  },
  time: {
    type: String,
  },
  user: {
    type: mongoose.ObjectId,
    ref: "user",
  },
});

const Department = mongoose.model("department", departmentSchema);
module.exports = Department;
