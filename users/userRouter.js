const express = require("express")

const Users = require("./userModel")

const router = express.Router({
    mergeParams:true
})

// Creates a user using the information sent inside the body of the request. 
// Hash the password before saving the user to the database.
router.post('/register', (req, res) => {

})
// Use the credentials sent inside the body to authenticate the user. 
// On successful login, 
//     > create a new session for the user
//     > send back a 'Logged in' message and a cookie that contains the user id. 
// If login fails, 
//     > respond with the correct status code and the message: 'You shall not pass!'
router.post('/login', (req, res) => {

})

// If the user is logged in, 
//     > respond with an array of all the users contained in the database. 
// If the user is not logged in,
//     > repond with the correct status code and the message: 'You shall not pass!'.
router.get('/users', (req, res) => {

})




module.exports = router;