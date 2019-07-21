module.exports = function (sequelize, DataTypes) {
  var Option = sequelize.define("Option", {
// sequelize auto-generates IDs, so not specifying it explicitly here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
  });
  Option.associate = function (models) {
    Option.belongsToMany(models.User, { through: 'Favs', onDelete: "cascade" })
    };
  return Option;
};

// var orm = require("../config/orm.js");

// var fav = {
//   all: function(cb) {
//     orm.all("favs", function(res) {
//       cb(res);
//     });
//   },
//   // The variables cols and vals are arrays.
//   create: function(cols, vals, cb) {
//     orm.create("favs", cols, vals, function(res) {
//       cb(res);
//     });
//   },
//   update: function(objColVals, condition, cb) {
//     orm.update("favs", objColVals, condition, function(res) {
//       cb(res);
//     });
//   },
//   delete: function(condition, cb) {
//     orm.delete("favs", condition, function(res) {
//       cb(res);
//     });
//   }
// };

// module.exports = fav;