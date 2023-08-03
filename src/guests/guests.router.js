const router = require("express").Router()
const controller = require("./guests.controller.js")
const methodNotAllowed =  require("../errors/methodNotAllowed")

router
    .route("/:guest_id")
    .get(controller.read)
    .put(controller.update)
    .all(methodNotAllowed)

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)
    
module.exports = router