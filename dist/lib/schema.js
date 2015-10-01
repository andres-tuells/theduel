"use strict";

var db = require("./db").db;
var Manager = require("knex-schema");
var manager = new Manager(db);

var users = {
  tableName: "users",
  build: function build(table) {
    table.increments("id").primary();
    table.string("username").unique();
    table.string("facebook_token");
  },
  populate: function populate(database) {
    return db.knex("users").insert([]);
  }
};

var devices = {
  tableName: "devices",
  build: function build(table) {
    table.increments("id").primary();
    table.string("guid").unique();
    table.boolean("connected");
    table.string("position");
  },
  populate: function populate(database) {
    return db.knex("devices").insert([]);
  }
};

var tables = [users, devices];
manager.drop(tables).then(function () {
  return manager.sync(tables);
});
// Create / Update tables articles.
//manager.populate([articles]); // Populate table articles.
//manager.reset([articles]); // Remove all data from articles.
//manager.drop([articles]); // Drop table articles.

module.exports = {
  users: users,
  devices: devices
};
//# sourceMappingURL=../lib/schema.js.map