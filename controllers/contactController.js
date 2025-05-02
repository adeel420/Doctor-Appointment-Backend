const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createContact = async (req, res) => {
  try {
    const { firstName, LastName, email, phoneNo, topic, message } = req.body;
    const data = new Contact({
      firstName: firstName,
      LastName: LastName,
      email: email,
      phoneNo: phoneNo,
      topic: topic,
      message: message,
    });
    const response = await data.save();
    await transporter.sendMail({
      to: "adeelimran467@gmail.com",
      subject: "New Complaint Submitted - Healthcare",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Complaint Received</h2>
            <p>A new complaint has been submitted by <strong>${firstName} ${LastName}</strong>.</p>
            
            <h3>Complaint Details:</h3>
            <h5><b>First Name:</b> ${firstName}</h5>
            <h5><b>Last Name:</b> ${LastName}</h5>
            <h5><b>Email:</b> ${email}</h5>
            <h5><b>Phone Number:</b> ${phoneNo}</h5>
            <h5><b>Topic:</b> ${topic}</h5>
            <h5><b>Message:</b> ${message}</h5>
      
            <p>Please address this complaint as soon as possible.</p>
      
            <br/>
            <p>Best regards,<br/>Healthcare System</p>
          </div>
        `,
    });

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getContact = async (req, res) => {
  try {
    const response = await Contact.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
