const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
    },
    patientEmail: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    department: {
      type: String,
    },
    time: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;
