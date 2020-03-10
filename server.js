const express = require("express");
const welcomeRouter = require("./welcome/welcomeRouter");
const userRouter = require("./users/userRouter");

const server = express();
const port = process.env.PORT || 4400;

server.use(express.json());

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
