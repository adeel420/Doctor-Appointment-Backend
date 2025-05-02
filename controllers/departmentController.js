const Department = require("../models/department");
const User = require("../models/user");

exports.createDeparment = async (req, res) => {
  try {
    const { department, time, user } = req.body;

    const userId = await User.findById(user);
    if (!userId) {
      return res.status(404).json({ msg: "User not found" });
    }

    const data = new Department({
      department: department,
      time: time,
      user: userId._id,
    });

    const response = await data.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const { userId } = req.params;
    const department = await Department.findOne({ user: userId }).populate(
      "user",
      "name"
    );
    if (!department) {
      return res.status(200).json(null);
    }
    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const newData = await Department.findByIdAndUpdate(id, data);
    const response = await newData.save();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Department.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getAllDepartment = async (req, res) => {
  try {
    const data = await Department.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
