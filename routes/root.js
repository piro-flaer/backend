const express = require('express')
const router = express.Router()

const path = require('path')

router.get("^/$|/index(.html)?", (req,res)=>{
    res.sendStatus(200)
})

module.exports = router
