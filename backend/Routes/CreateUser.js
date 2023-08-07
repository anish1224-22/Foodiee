const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret ="LoveMyselfTheMostInTheWholeWorld";
router.post(
  "/CreateUser",
  [
    (body("email", "Email id doesn't exist").isEmail()),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt= await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secpassword,
      });
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      return res.json({ success: false });
    }
  }
);
router.post("/LoginUser", [
  (body("email", "Email id doesn't exist").isEmail()),
  body("password", "Incorrect Password").isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.body.email;
  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try logging in with correct credentials" });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: "Try logging in with correct credentials" });
    }
    const data = {
      user: {
        id: userData.id
      }
    }
    const authToken = jwt.sign(data, jwtSecret)
    return res.json({ success: true, authToken: authToken })
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});
module.exports = router;