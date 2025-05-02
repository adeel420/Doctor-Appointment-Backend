const express = require("express");
const {
  createBooking,
  getBooking,
  changeStatus,
} = require("./../controllers/bookingController");
const router = express.Router();

router.post("/", createBooking);
router.get("/:departmentName", getBooking);
router.put("/:id", changeStatus);

module.exports = router;
