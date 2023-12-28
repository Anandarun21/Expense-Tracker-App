document.addEventListener('DOMContentLoaded', function () {
    // Load expenses from local storage on page load
    loadExpenses();
});

function addExpense() {
    const expenseInput = document.getElementById('expense');
    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');

    const expense = expenseInput.value.trim();
    const category = categoryInput.value; // Get the selected value directly
    const amount = parseFloat(amountInput.value);

    if (expense === '' || isNaN(amount)) {
        alert('Please enter a valid expense and amount.');
        return;
    }

    // Create an expense object
    const newExpense = {
        id: new Date().getTime(),
        description: expense,
        category: category,
        amount: amount
    };

    // Add the new expense to the list
    const expenses = getExpenses();
    expenses.push(newExpense);

    // Save the updated expenses to local storage
    saveExpenses(expenses);

    // Clear input fields
    expenseInput.value = '';
    categoryInput.value = ''; // Add this line
    amountInput.value = '';

    // Update the displayed expense list
    displayExpenses();
}

function getExpenses() {
    // Retrieve expenses from local storage
    const expensesString = localStorage.getItem('expenses');
    return expensesString ? JSON.parse(expensesString) : [];
}

function saveExpenses(expenses) {
    // Save expenses to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    // Display expenses on the page
    displayExpenses();
}

function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    const expenses = getExpenses();

    if (expenses.length === 0) {
        expenseList.innerHTML = '<p>No expenses yet.</p>';
    } else {
        expenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');

            // Format the expense item with bullet points
            const formattedExpense = `${expense.amount.toFixed(2)} - ${expense.category} - ${expense.description}`;
            expenseItem.innerHTML = `
                <p>${formattedExpense} 
                   <button onclick="editExpense(${expense.id})">Edit</button>
                   <button onclick="deleteExpense(${expense.id})">Delete</button>
                </p>
            `;
            expenseList.appendChild(expenseItem);
        });
    }
}

function editExpense(id) {
    const expenses = getExpenses();
    const expenseToEdit = expenses.find(expense => expense.id === id);

    // Fill the input fields with the details of the expense to be edited
    document.getElementById('expense').value = expenseToEdit.description;
    document.getElementById('category').value = expenseToEdit.category;
    document.getElementById('amount').value = expenseToEdit.amount.toFixed(2);

    // Remove the expense from the expenses array
    expenses.splice(expenses.indexOf(expenseToEdit), 1);

    // Save the updated expenses to local storage
    saveExpenses(expenses);

    // Update the displayed expense list
    displayExpenses();
}

function deleteExpense(id) {
    const expenses = getExpenses();
    const updatedExpenses = expenses.filter(expense => expense.id !== id);

    // Save the updated expenses to local storage
    saveExpenses(updatedExpenses);

    // Update the displayed expense list
    displayExpenses();
}
