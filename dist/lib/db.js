"use strict";

var db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "duel_user",
    password: "duel_pass",
    database: "theduel",
    charset: "utf8"
  }
});

var postgis = require("knex-postgis");

module.exports = {
  db: db,
  postgis: postgis
};
//# sourceMappingURL=../lib/db.js.map