const express = require("express");
const welcomeRouter = require('./welcome/welcomeRouter'); // needs route added
// const resourceRouter = require("./resource/resource-router");
// const projectRouter = require("./project/project-router")
// const taskRouter = require("./task/task-router")

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());

server.use("/", welcomeRouter);
// server.use("/api/resource", resourceRouter);
// server.use("/api/project", projectRouter)
// server.use("/api/task", taskRouter)

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong. Good-bye."
  });
});

server.listen(port, () => {
  console.log(`Server galloping at http://localhost:${port}`);
});