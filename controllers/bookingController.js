const Booking = require("../models/booking");
const Department = require("../models/department");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createBooking = async (req, res) => {
  try {
    const { patientName, patientEmail, phoneNo, department, status } = req.body;
    const response = new Booking({
      patientName,
      patientEmail,
      phoneNo,
      department,
      status,
    });
    const result = await response.save();
    await transporter.sendMail({
      to: patientEmail,
      subject: "Booking Appointment - Healthcare",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Appointment Confirmation</h2>
            <p>Dear ${patientName},</p>
            <p>Thank you for booking your appointment with <strong>Healthcare</strong>.</p>
<p>We're pleased to confirm your request. You will get the details shortly once the doctor updates your status.</p>
<p>Your current status is <strong>Pending</strong>. You will receive an email once the doctor reviews your request, letting you know whether your appointment has been approved or not. If approved, the appointment timing will also be shared.</p>

            <p>Best regards,<br/>Healthcare Team</p>
          </div>
        `,
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const departmentName = req.params.departmentName;
    const department = await Department.findOne({ department: departmentName });
    const bookings = await Booking.find({ department: departmentName });
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { patientName, patientEmail, phoneNo, department, status, time } =
      req.body;

    if (!patientEmail) {
      return res.status(400).json({ msg: "Patient email is required." });
    }

    const data = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    await transporter.sendMail({
      to: patientEmail,
      subject: "Booking Appointment - Healthcare",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Appointment Confirmation</h2>
          <p>Dear ${patientName},</p>
          <p>Thank you for booking your appointment with <strong>Healthcare</strong>.</p>
          <p>Your current status is <strong>${status}</strong>.</p>
          <p>Best regards,<br/>Healthcare Team</p>
          <h5><b>Name: </b> ${patientName}</h5>
          <h5><b>Email: </b> ${patientEmail}</h5>
          <h5><b>PhoneNo: </b> ${phoneNo}</h5>
          <h5><b>Appointment Time: </b> ${time}</h5>
          <h5><b>Department: </b> ${department}</h5>
          <h5><b>Status: </b> ${status}</h5>
        </div>
      `,
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
