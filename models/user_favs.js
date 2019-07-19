var orm = require("../config/orm.js");

var user_favs = {
    all: function(cb) {
        orm.all("user_favs", function(res) {
          cb(res);
        });
      },
      // The variables cols and vals are arrays.
      create: function(cols, vals, cb) {
        orm.create("user_favs", cols, vals, function(res) {
          cb(res);
        });
      },
      update: function(objColVals, condition, cb) {
        orm.update("user_favs", objColVals, condition, function(res) {
          cb(res);
        });
      },
      delete: function(condition, cb) {
        orm.delete("user_favs", condition, function(res) {
          cb(res);
        });
      }
};

module.exports = user_favs;