const express = require("express");
const {
  createDeparment,
  getDepartment,
  getDepartmentById,
  update,
  deleteDepartment,
  getAllDepartment,
} = require("../controllers/departmentController");
const router = express.Router();

router.post("/", createDeparment);
router.get("/:userId", getDepartment);
router.get("/get/:id", getDepartmentById);
router.put("/:id", update);
router.delete("/:id", deleteDepartment);
router.get("/", getAllDepartment);

module.exports = router;
