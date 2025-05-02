const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    topic: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
