const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const { email } = req.body;
    const exist = await User.findOne({ email });
    if (exist) res.status(400).json("user with this email existe");
    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log("error", error);
  }
};

const getUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    res.json(usersList);
  } catch (error) {
    console.log("error", error);
  }
};

const getuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.log("error", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      await user.deleteOne();
      res.status(200).json("user deleted");
    } else {
      res.status(400).json("user not found");
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getuser,
  deleteUser,
};
