const User = require("../models/user");
const bcrypt = require("bcrypt");
const generatetoken = require("../utlis/generatetoken");
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const { email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) res.status(400).json("user with this email existe");
    const hashPs = await bcrypt.hash(password, 10);
    user.password = hashPs;
    const newUser = await user.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log("error", error);
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("user", user);
    console.log("req.body", req.body);
    const isMatch = user && (await bcrypt.compare(password, user.password));
    console.log("isMatch", isMatch);
    if (user && isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generatetoken(user._id),
      });
      console.log("login succ");
    } else {
      return res.status(401).json("invalid eamil or password");
    }
  } catch (error) {
    console.log("errr", error);
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await User.findById(userId);
    if (userFound) {
      Object.assign(userFound, req.body);
      await userFound.save();

      return res.status(201).json(userFound);
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  createUser,
  getUsers,
  getuser,
  deleteUser,
  updateUser,
  authUser,
};
