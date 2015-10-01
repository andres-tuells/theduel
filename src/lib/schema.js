var db = require("./db").db;
var Manager = require('knex-schema');
var manager = new Manager(db);

var users = {
  tableName: 'users',
  build: function (table) {
    table.increments('id').primary();
    table.string('username').unique();
    table.string('facebook_token');

  },
  populate: function (database) {
    return db.knex('users').insert([
    ]);
  }
};

var devices = {
  tableName: 'devices',
  build: function (table) {
    table.increments('id').primary();
    table.string('guid').unique();
    table.boolean('connected');
    table.string('position');
  },
  populate: function (database) {
    return db.knex('devices').insert([
    ]);
  }
};

var tables = [users, devices];
manager.drop(tables).then(()=>manager.sync(tables));
// Create / Update tables articles. 
//manager.populate([articles]); // Populate table articles. 
//manager.reset([articles]); // Remove all data from articles. 
//manager.drop([articles]); // Drop table articles. 

module.exports = {
  users:users,
  devices:devices
};