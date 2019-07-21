// use bcryptjs for password hashing:
var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // this ensures that the email isn't null, and is a proper email before adding  a user:
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
// check if the unhashed password entered by the user can be compared to the hashed password stored in the database:
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
// automatically hash the password before a new user is created (hooks are automatic methods that run during various phases of the User Model lifecycle):
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  // create a N:M association to the options table (through a sequelize-generated favs table):
  User.associate = function (models) {
    User.belongsToMany(models.Option, {
      through: 'Favs',
      constraints: false,
      onDelete: "cascade"
    })
  };
  return User;
};