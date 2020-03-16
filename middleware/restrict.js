const bcrypt = require("bcryptjs");
const Users = require("../users/userModel");

const sessions = {};

function restrict() {
  const authError = {
    message: "Invalid Credentials"
  };

  return async (req, res, next) => {
    // console.log("Sessions", sessions)
    // console.log(req.headers)

    // virtual wristband!
    try {
      // const { authorization } = req.headers
      // if(!sessions[authorization]) {
      //   return res.status(401).json(authError)
      // }

      // const { cookie } = req.headers
      // if(!cookie){
      //   return res.status(401).json(authError)
      // }

      // const authToken = cookie.replace("token=", "")
      // if(!sessions[authToken]){
      //   return res.status(401).json(authError)
      // }

      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
module.exports = {
  sessions,
  restrict
};

// const { phonenumber, password } = req.headers;
// if (!phonenumber || !password) {
//   return res.status(401).json(authError);
// }

// const user = await Users.findBy({ phonenumber }).first();
// if (!user) {
//   return res.status(401).json(authError);
// }

// const passwordValid = await bcrypt.compare(password, user.password);
// if (!passwordValid) {
//   return res.status(401).json(authError);
// }
