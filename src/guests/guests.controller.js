const service = require("./guests.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next){
    res.status(200).json({data: await service.list() })
}

async function update(req, res, next){
    
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}