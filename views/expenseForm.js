// const expenseForm = document.querySelector("#expense-form")

// expenseForm.addEventListener('submit', async(event) => {
//     event.preventDefault();

//   const name = document.getElementById('name').value;
//   const amount = document.getElementById('amount').value;
//   const date = document.getElementById('date').value;
//   const category = document.getElementById('category').value;
//   const description = document.getElementById('description').value;

//   const data = { name, amount, date, category, description };

//   try {
//     const response = await axios.post('http://localhost:3100/user', data, {
//         headers: { 'Content-Type': 'application/json'}
//     })
//     console.log(response.data);
//     displayExpenseDetails();
//     expenseForm.reset();
//   } catch (error) {
//     console.error(error);
//   }
// })

// async function displayExpenseDetails() {
//     try {
//         const response = await axios.get('http://localhost:3100/users');
//         const expenses = response.data;
//         const tableBody = document.querySelector('#expenses-table-body');
//         let html = '';
//         for (const expense of expenses) {
//         html += `
//             <tr>
//             <td>${expense.name}</td>
//             <td>${expense.amount}</td>
//             <td>${expense.date}</td>
//             <td>${expense.category}</td>
//             <td>${expense.description}</td>
//             <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
//             <td><button class="edit-btn" data-id="${expense.id}">Edit</button></td>
//             </tr>
//         `;
//         }
//         tableBody.innerHTML = html;

//         tableBody.addEventListener('click', async (event) => {
//             if (event.target.classList.contains('delete-btn')) {
//               const expenseId = event.target.dataset.id;
//               const confirmDelete = confirm('Are you sure you want to delete this expense?');
//               if (confirmDelete) {
//                 try {
//                   await axios.delete(`http://localhost:3100/users/${expenseId}`);
//                   event.target.parentElement.parentElement.remove();
//                 } catch (error) {
//                   console.error(error);
//                 }
//               }
//             } else if(event.target.classList.contains('edit-btn')) {
//                     const expenseId = event.target.dataset.id;
//                     const response = await axios.get(`http://localhost:3100/users/${expenseId}`);
//                     const expense = response.data;
                    
//                     document.getElementById('name').value = expense.name;
//                     document.getElementById('amount').value = expense.amount;
//                     document.getElementById('date').value = expense.date;
//                     document.getElementById('category').value = expense.category;
//                     document.getElementById('description').value = expense.description;

//                        // Update the submit button to show the "Save" text
//                         const submitBtn = document.querySelector('#add-expense-btn');
//                         submitBtn.textContent = 'Save';
//                         submitBtn.dataset.id = expenseId;

//                         // Update the event listener to handle the "Save" action
//                         expenseForm.removeEventListener('submit', async (event) => {
//                             event.preventDefault();
//                             addExpense();
//                         });
//                         expenseForm.addEventListener('submit', async (event) => {
//                         event.preventDefault();

//                         const name = document.getElementById('name').value;
//                         const amount = document.getElementById('amount').value;
//                         const date = document.getElementById('date').value;
//                         const category = document.getElementById('category').value;
//                         const description = document.getElementById('description').value;

//                         const data = { name, amount, date, category, description };

//                         try {
//                             await axios.put('http://localhost:3100/users/${expenseId}', data, {
//                                 headers: { 'Content-Type': 'application/json'}
//                                 });
//                                 console.log("Expense updated successfully!");
//                                 displayExpenseDetails();
//                                 expenseForm.reset();
//                                 submitBtn.textContent = 'Add';
//                                 submitBtn.removeAttribute('data-id');
//                         } catch (error) {
//                              console.error(error);
//                             }
//                          });
//                 }
//             })
            
//           }
//         }; 
//     catch (error) {
//        console.error(error); 
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     displayExpenseDetails();
//   });
  


const expenseForm = document.querySelector("#expense-form");
const tableBody = document.querySelector("#expenses-table-body");
const submitBtn = document.querySelector("#add-expense-btn");

expenseForm.addEventListener("submit", handleAddExpense);

tableBody.addEventListener("click", event => {
  if (event.target.classList.contains("edit-btn")) {
    handleEditExpense(event.target.dataset.id);
  } else if (event.target.classList.contains("delete-btn")) {
    handleDeleteExpense(event.target.dataset.id);
  }
});

document.addEventListener("DOMContentLoaded", displayExpenseDetails);

async function handleAddExpense(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  const data = { name, amount, date, category, description };

  try {
    const response = await axios.post("http://localhost:3100/user", data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    displayExpenseDetails();
    expenseForm.reset();
  } catch (error) {
    console.error(error);
  }
}

async function handleEditExpense(expenseId) {
  const response = await axios.get(`http://localhost:3100/users/${expenseId}`);
  const expense = response.data;

  document.getElementById("name").value = expense.name;
  document.getElementById("amount").value = expense.amount;
  document.getElementById("date").value = expense.date;
  document.getElementById("category").value = expense.category;
  document.getElementById("description").value = expense.description;

  submitBtn.textContent = "Save";
  submitBtn.dataset.id = expenseId;

  expenseForm.removeEventListener("submit", handleAddExpense);
  expenseForm.addEventListener("submit", handleSaveExpense);
}

async function handleSaveExpense(event) {
  event.preventDefault();

  const expenseId = submitBtn.dataset.id;
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  const data = { name, amount, date, category, description };

  try {
    await axios.put(`http://localhost:3100/users/${expenseId}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Expense updated successfully!");
    displayExpenseDetails();
    expenseForm.reset();
    submitBtn.textContent = "Add";
    submitBtn.removeAttribute("data-id");
    expenseForm.removeEventListener("submit", handleSaveExpense);
    expenseForm.addEventListener("submit", handleAddExpense);
  } catch (error) {
    console.error(error);
  }
}

async function handleDeleteExpense(expenseId) {
  const confirmDelete = confirm("Are you sure you want to delete this expense?");
  if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:3100/users/${expenseId}`);
      displayExpenseDetails();
    } catch (error) {
      console.error(error);
    }
  }
}

async function displayExpenseDetails() {
    try {
        const response = await axios.get('http://localhost:3100/users');
        const expenses = response.data;
        const tableBody = document.querySelector('#expenses-table-body');
        let html = '';
        for (const expense of expenses) {
        html += `
            <tr>
            <td>${expense.name}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td><button class="delete-btn" data-id="${expense.id}">Delete</button></td>
            <td><button class="edit-btn" data-id="${expense.id}">Edit</button></td>
            </tr>
        `;
        }
        tableBody.innerHTML = html;
    } catch (error) {
        console.error(error);
      }
}