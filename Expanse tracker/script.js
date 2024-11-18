document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseNameInput = document.getElementById("expense-name");

    let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

    let totalExpenseAmount = calculateTotalExpenseAmount();
    displayTotalExpenseAmount();
    if(expenses.length > 0) {
        expenses.forEach(expense => {
            displayExpense(expense);
        });
    }


    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const expenseName = expenseNameInput.value;
        const expenseAmount = parseFloat(expenseAmountInput.value);

        if(expenseName !== "" && !isNaN(expenseAmount)) {
            console.log(Date.now())
            const newExpense = {
                id: Date.now(),
                expenseName,
                expenseAmount
            };

            expenses.push(newExpense);
            saveExpensesToLocalStorage(expenses);
            displayExpense(newExpense);

            totalExpenseAmount = calculateTotalExpenseAmount();
            displayTotalExpenseAmount();
            expenseNameInput.value = "";
            expenseAmountInput.value = "";

            }
        })

    // Function to calculate total expense amount
    function calculateTotalExpenseAmount() {
        return expenses.reduce((sum, expense)=> (sum + expense.expenseAmount), 0);
    }

    // Function to save expenses to local storage
    function saveExpensesToLocalStorage(expenses) {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Function to display expenses
    function displayExpense(expense) {
        const li = document.createElement("li");
        li.innerHTML = `<span>
        Name: ${expense.expenseName} - Amount: ${expense.expenseAmount} 
        </span><button>Delete</button>`;

        li.setAttribute("data-id", expense.id);

        li.querySelector("button").addEventListener("click", function () {
            const expenseId = li.getAttribute("data-id");
            console.log(expenseId)
            const updatedExpenses = expenses.filter(expense => expense.id !== parseInt(expenseId));

            console.log(updatedExpenses);
            expenses = updatedExpenses;
            saveExpensesToLocalStorage(expenses);
            li.remove();
            totalExpenseAmount = calculateTotalExpenseAmount();
            displayTotalExpenseAmount();
        })
        expenseList.appendChild(li);
    }

    // displayTotalExpenseAmount()
    function displayTotalExpenseAmount() {
        totalAmountDisplay.textContent = totalExpenseAmount;
    }

})