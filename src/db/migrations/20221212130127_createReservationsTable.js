exports.up = function (knex) {
    return knex.schema.createTable("reservations", (table) => {
      table.increments("reservation_id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("mobile_number");
      table.string("reservation_date");
      table.string("reservation_time");
      table.integer("people");
      table.string("status").defaultTo("booked");
      table.integer("guest_id")
      table
        .foreign("guest_id")
        .references("guest_id")
        .inTable("guests")
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("reservations");
  };
