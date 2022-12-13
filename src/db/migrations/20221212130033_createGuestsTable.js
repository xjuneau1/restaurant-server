exports.up = function (knex) {
  return knex.schema.createTable("guests", (table) => {
    table.increments("guest_id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("email");
    table.string("birthday");
    table.string("company");
    table.string("notes");
    table.string("confirmed").defaultTo("false");
    table.string("section");
    table.string("waiter");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("guests");
};
