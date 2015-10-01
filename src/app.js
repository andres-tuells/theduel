require("babel/polyfill");

global["_"]         = require("lodash");
global["asyncify"]  = require("./lib/asyncify");
global["db"]        = require("./lib/db").db;
global["schema"]    = require("./lib/schema");

var timeout  = require("./lib/timeout");
var logger   = require("./lib/logger");
var ws       = require("./lib/ws");
var actions  = require("./lib/actions");
var loader   = require("./lib/loader");

loader.loadConfigToGlobals();
loader.loadToGlobals(__dirname + "/api/services", /(.+Service)\.js$/);
loader.loadToGlobals(__dirname + "/api/models", /(.+)\.js$/);


ws.request(function(connection){
  var addr = connection.socket.remoteAddress;
  var port = connection.socket.remotePort;
  actions(connection).start(function(){

    logger.info("Connection received from %s:%s", addr, port );

  }).on("Ping",function(data){

    connection.sendAction("Pong", {sended:new Date()});

  }).on("UserPosition",function(data){
    console.log("before add pos");
    var r = connection.addPosition(data.lat, data.lon);
    console.log("afet add pos");
    connection.sendAction("UserPositionResult", r);
    console.log("res sended");

  }).on("Login", async function(data){
    console.log("LoginAction");
    try{
      var r = await UserService.login(data);
      console.log("r=" + JSON.stringify(r));
      connection.sendAction("Logged",r);
    }catch(error){
      console.log("error captured in catch try " + error.message);
    }
    

  }).on("RankingInfo", async function(data){

    connection.sendAction("RankingResult",await UserService.ranking(data));

  }).on("UserInfo", async function(data){

    connection.sendAction("UserResult",await UserService.ranking(data));

  }).on("StartDuel", async function(data){

    connection.sendAction("RankingResult",await UserService.ranking(data));

  }).on("AcceptDuel", async function(data){

    connection.sendAction("AcceptedDuel",await UserService.ranking(data));

  }).on("DuelReady", async function(data){

    connection.sendAction("StartShooting",await UserService.ranking(data));

  }).on("Shoot", async function(data){

    connection.sendAction("DuekResult",await UserService.ranking(data));

  }).close(function(data){

    ConnectionService.removeConnection(connection);
    logger.info("Disconnected %s:%s (%s:%s)", addr, port, data.reasonCode, data.description);

  });
});
