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
    Option.belongsToMany(models.User, { through: 'Favs' })
    };
  return Option;
};