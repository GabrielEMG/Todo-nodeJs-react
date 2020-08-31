const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const auth = require("../middleware/auth");

const userError = (res, message) => {
  res.status(400).json({ message });
};

const serverError = (res, error) => {
  res.status(500).json({ error: error.message });
};

router.post("/signup", async (req, res) => {
  try {
    const { email, password, passwordValidation } = req.body;
    let { username } = req.body;
    if (!email || !password || !passwordValidation) {
      userError(res, "not all fields has been filled");
    }
    if (password.length < 5) {
      userError(res, "password length is too short (5 chars at least)");
    }
    if (password !== passwordValidation) {
      userError(res, "both passwords must be the same");
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      userError(res, "Email already signedup");
    }
    if (!username) {
      username = email;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      username,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    serverError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      userError(res, "not all field has been filled");
    }
    const user = await User.findOne({ email });
    if (!user) {
      userError(res, "there is not accounts register with this email");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      userError(res, "invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.user);
    return res.json(deletedUser);
  } catch (err) {
    serverError(res, err);
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const tokenVerification = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenVerification) {
      return res.json(false);
    }
    const user = await User.findById(tokenVerification.id);
    if (!user) {
      return res.json(false);
    }
    return res.json(true);
  } catch (err) {
    serverError(res, err);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    return res.json({
      id: user._id,
      username: user.username,
    });
  } catch (err) {
    serverError(res, err);
  }
});

module.exports = router;
