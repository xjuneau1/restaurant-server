const knex = require("../db/connection");

function list(){
    return knex("guests")
        .select("*")
        .returning("*")
}

module.exports = {
    list
}