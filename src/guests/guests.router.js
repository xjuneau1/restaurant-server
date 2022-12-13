const router = require("express").Router()
const controller = require("./guests.controller.js")
const methodNotAllowed =  require("../errors/methodNotAllowed")

router
    .route("/")
    .get(controller.list)
    
module.exports = router