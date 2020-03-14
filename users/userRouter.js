const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../users/userModel");
const { sessions, restrict } = require("../middleware/restrict");

const router = express.Router({
  mergeParams: true
});

// Creates a user using the information sent inside the body of the request.
// Hash the password before saving the user to the database.
router.post("/register", async (req, res, next) => {
  try {
    const saved = await Users.add(req.body);
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});
// Use the credentials sent inside the body to authenticate the user.
// On successful login,
//     > create a new session for the user
//     > send back a 'Logged in' message and a cookie that contains the user id.
// If login fails,
//     > respond with the correct status code and the message: 'You shall not pass!'
router.post("/login", async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await Users.findBy({ phoneNumber }).first();
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user && !passwordValid) {
      res.status(401).json({
        message: `Invalid credentials. The authorities have been alerted.`
      });
    }
    const authToken = Math.random();
    sessions[authToken] = user.id;

    // res.setHeader("Authorization", authToken);
    res.setHeader("Set-Cookie", `token=${authToken}; Path=/`);

    res.json({
      message: `Welcome, ${user.phoneNumber}`
    });
  } catch (error) {
    next(error);
  }
});

// If the user is logged in,
//     > respond with an array of all the users contained in the database.
// If the user is not logged in,
//     > repond with the correct status code and the message: 'You shall not pass!'.

router.get("/users", restrict(), async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", restrict(), (req, res, next) => {
  // destroy the session here
  res.end();
});

module.exports = router;
