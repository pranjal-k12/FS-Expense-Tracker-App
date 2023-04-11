const sequelize = require("../util/database")
const User = require("../models/expenseModel")

const addExpenseDetails = async (req, res) => {
    try {
     const {name, amount, date, category, description} = req.body;
     const user = await User.create({name, amount, date, category, description});
     res.status(201).json(user)
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Failed to create user.' });
    }
   }

const getExpenseDetails = async (req, res) => {
    try {
      const users = await User.findAll()
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getExpenseDetailsById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const editExpenseDetails =  async(req, res) => {
    try {
      const { id } = req.params;
      const { name, amount, date, category, description } = req.body;
      const updatedUser = await User.update(
        { name, amount, date, category, description },
        { where: { id } }
      );
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const deleteExpenseDetails = async(req, res) => {
    try {
      const expense = await User.findByPk(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      await expense.destroy();
      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  module.exports = { addExpenseDetails, getExpenseDetails, getExpenseDetailsById, editExpenseDetails, deleteExpenseDetails };