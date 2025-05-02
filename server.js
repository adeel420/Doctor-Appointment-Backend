const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const passport = require("./middlewares/auth");
app.use(passport.initialize());

// Files
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Routes
app.use("/user", userRoutes);
app.use("/department", departmentRoutes);
app.use("/booking", bookingRoutes);
app.use("/contact", contactRoutes);

//  Packages
const PORT = process.env.PORT;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Listening the port ${PORT}`);
});
