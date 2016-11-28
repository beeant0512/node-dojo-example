define([
  "dojo/text!app-server/config.json"
], function(configJSON){
  return JSON.parse(configJSON)[process.env.NODE_ENV || "development"];
});