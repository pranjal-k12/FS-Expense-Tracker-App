const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv')

const { addExpenseDetails,
    getExpenseDetails,
      getExpenseDetailsById,
     editExpenseDetails, 
     deleteExpenseDetails
     } = require("./controllers/expenseControllers")

const sequelize = require("./util/database")
const User = require("./models/expenseModel")

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());


app.post('/user', addExpenseDetails )

app.get('/users', getExpenseDetails )

app.get('/users/:id', getExpenseDetailsById)

app.put('/users/:id', editExpenseDetails)

app.delete('/users/:id',deleteExpenseDetails)

sequelize.sync()
.then(() => {
  app.listen(3100, () => {
    console.log("Server is running on port 3100");
})
})
.catch(err => console.log(err))




