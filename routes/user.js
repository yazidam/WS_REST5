const express = require("express");

const {
  createUser,
  getUsers,
  getuser,
  deleteUser,
  updateUser,
  authUser,
} = require("../controllers/userController");
const { uservalidator, validate } = require("../middlewares/validators");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", uservalidator, validate, createUser);
router.post("/login", authUser);
router.get("/all", getUsers);
router.get("/:id", getuser);
router.delete("/:id", deleteUser);
router.patch(":/id", updateUser);

module.exports = router;
