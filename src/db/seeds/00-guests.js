const guests = require("./00-guests.json")

exports.seed = function(knex) {
  return knex
    .raw("TRUNCATE TABLE guests RESTART IDENTITY CASCADE")
    .then(() => knex("guests").insert(guests));
};
