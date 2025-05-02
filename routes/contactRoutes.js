const express = require("express");
const {
  createContact,
  getContact,
} = require("./../controllers/contactController");
const router = express.Router();

router.post("/", createContact);
router.get("/", getContact);

module.exports = router;
