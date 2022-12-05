const knex = require("../db/connection");

function list() {
  return knex("tables").select("*")
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

async function update(table_id, reservation_id) {
  return await knex.transaction((trx) => {
    return knex("reservations")
      .transacting(trx)
      .where({ reservation_id: reservation_id })
      .update({ status: "seated" })
      .then(() => {
        return knex("tables")
          .where({ table_id: table_id })
          .update({ reservation_id: reservation_id, table_status: "occupied" })
          .returning("*");
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}
async function updateTable(table, table_id) {
  const {
    table_name,
    capacity
  } = table;
  return knex("tables")
    .select("*")
    .where({ table_id })
    .update({
        capacity: capacity,
        table_name: table_name
    })
    .returning("*")
    .then((updatedRecords)=> updatedRecords[0])
}
async function finishTable(table_id, reservation_id) {
  return knex.transaction((trx) => {
    return knex("reservations")
      .transacting(trx)
      .where({ reservation_id: reservation_id })
      .update({ status: "finished" })
      .returning("*")
      .then(() => {
        return knex("tables")
          .where({ table_id: table_id })
          .update({ reservation_id: null, table_status: "free" })
          .returning("*");
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

function removeTable(table_id){
  return knex("tables")
  .select("*")
  .where({ table_id })
  .del()
}

module.exports = {
  list,
  read,
  create,
  update,
  updateTable,
  finishTable,
  removeTable
};
