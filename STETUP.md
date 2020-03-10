# STEP UP > Authentication Project

## INSTALLS
- npm install
- PACKAGE.JSON > npm init -y 
    >> Scripts, add:
        > "server": "nodemon server.js or index.js"
        > "start": "node server or index"
- EXPRESS > npm i express --save
- KNEX & SQLITE3 > npm i knex sqlite3
- KNEXFILE, create > NPX knex init 
- KNEXFILE, update > 
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/projects.db3'
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: "./data/seeds",
    }
  },
};
       
- NODEMON > npm install --save-dev nodemon
- dotenv > npm i dotenv

## FILE STRUCTURE
- mkdir data && touch data/config.js
- CONFIG.js, add > 
    > const knex = require("knex")
    const knexfile = require("../knexfile")
    module.exports = knex(knexfile.development)

## FILE STRUCTURE > index or server file
- touch server.js
- server.js > add: 
    const express = require("express")
    const welcomeRouter = require("./welcome/welcomeRouter")
    const server = express()
    const port = process.env.PORT || 4000
    server.use(express.json())
    server.use("/", welcomeRouter)
    server.use((err, req, res, next) => {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong",
        })
    })
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`)
    })

- mkdir welcome && touch welcome/welcomeRouter.js
    > welcomeRouter.js > add : 
        const express = require("express")
        const router = express.Router()
        router.get("/", (req, res, next) => {
            res.json({
                message: "Welcome to node-db-challenge",
            })
        })
        module.exports = router

- mkdir >  projects, resources, tasks
- touch > 
    projects/projectsRouter.js 
    projects/projectsModel.js 
    resources/resourcesRouter.js 
    resources/resourcesModel.js 
    tasks/tasksRouter.js 
    tasks/tasksModel.js
npm run server
