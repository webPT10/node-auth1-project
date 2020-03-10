const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./userModel");

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

    if (user && passwordValid) {
      res.status(200).json({
        message: `Hey-o, ${phoneNumber}!`
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials. The authorities have been alerted."
      });
    }
  } catch (error) {
    next(error);
  }
});

// If the user is logged in,
//     > respond with an array of all the users contained in the database.
// If the user is not logged in,
//     > repond with the correct status code and the message: 'You shall not pass!'.

function restricted() {
  const authError = {
    message: "Invalid credentials!"
  };

  return async (req, res, next) => {
    try {
      const { phoneNumber, password } = req.headers;
      if (!phoneNumber || !password) {
        return res.status(401).json(authError);
      }

      const user = await Users.findBy({ phoneNumber }).first();
      if (!user) {
        return res.status(401).json(authError);
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json(authError);
      }

      // if we reach this point, the user is authenticated!
      next();
    } catch (error) {
      next(error);
    }
  };
}

router.get("/users", restricted(), async (req, res, next) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
