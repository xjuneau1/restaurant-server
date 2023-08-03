const knex = require("../db/connection");
const tableName = "guests";
function list() {
  return knex(tableName).select("*").returning("*");
}

function read(guest_id){
    return knex(tableName).select("*").where({guest_id}).first()
}

function create(newGuest) {
  return knex(tableName).insert(newGuest).returning("*");
}

async function update(guest_id, updatedGuest) {
  return knex(tableName)
    .select("*")
    .where({ guest_id })
    .update(updatedGuest)
    .returning("*")
    .then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
  list,
  read,
  create,
  update
};
