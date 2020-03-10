const express = require("express")

const Users = require("./userModel")

const router = express.Router({
    mergeParams:true
})

router.post('/register', (req, res) => {

})

router.post('/login', (req, res) => {

})

router.get('/users', (req, res) => {

})




module.exports = router;