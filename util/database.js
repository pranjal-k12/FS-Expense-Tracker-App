const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize('expense_tracker', 'root', process.env.mysqlPassword, {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;