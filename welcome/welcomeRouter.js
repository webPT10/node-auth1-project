const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
    res.json({
        message: "Hey-o, Lambda! Welcome Router!"
    })
})
module.exports = router;