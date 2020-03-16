const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConfig = require("./data/config");
const welcomeRouter = require("./welcome/welcomeRouter");
const userRouter = require("./users/userRouter");

const server = express();
const port = process.env.PORT || 4400;

server.use(express.json());
server.use(
  session({
    name: "token", // overwrites the default cookie name + hides stack better
    resave: false, // avoids recreating sessions that have not changed
    saveUninitialized: false, // laws against setting cookies automatically
    secret: process.env.COOKIE_SECRET || "secret", // cryptographically sign the cookie
    cookie: {
      httpOnly: true // disallow javaScript from reading our cookie contents
      // maxAge: 15 * 1000, // expires cookie after 15seconds
    },
    store: new KnexSessionStore({
      createTable: true, // if session table doesn't exist, create it automatically
      knex: dbConfig //configured instance of knex
    })
  })
);

server.use("/", welcomeRouter);
server.use("/api", userRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong. Good-bye."
  });
});

server.listen(port, () => {
  console.log(`Server galloping at http://localhost:${port}`);
});
