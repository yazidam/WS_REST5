const jwt = require("jsonwebtoken");

const generatetoken = (id) => {
  return jwt.sign({ id }, "ahmed", {
    expiresIn: "1d",
  });
};

module.exports = generatetoken;
