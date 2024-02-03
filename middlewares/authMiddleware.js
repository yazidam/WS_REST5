const jwt = require("jsonwebtoken");

const User = require("../models/user");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("decoded", decoded);
      console.log("req.user", req.user);
      next();
    } catch (error) {
      res.status(401);
    }
  }
};

module.exports = protect;
