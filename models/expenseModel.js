// const sequelize = require("../util/database")
// const Sequelize = require("sequelize");


// const sequelize = new Sequelize('expense_tracker', 'root', process.env.mysqlPassword, {
//     dialect: 'mysql',
//     host: 'localhost'
// })

const sequelize = require("../util/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});

module.exports = User;
