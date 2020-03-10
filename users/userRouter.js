const express = require("express")

const Users = require("./userModel")

const router = express.Router({
    mergeParams:true
})


module.exports = router;