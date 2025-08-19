const CustomAPIError = require("../errors/custom-error");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  //can do this by : mongoose(schema method ie required),controllers,joi(later)

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello,${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });                     
};

module.exports = {
  login,
  dashboard,
};
