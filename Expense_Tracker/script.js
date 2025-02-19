document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expens")) || [];
  let totalAmount = calculateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };
      expenses.push(newExpense);
      updateTotal();
      renderExpenses()
      saveExpenses();

      // Clear Input

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function calculateTotal() {
    return expenses.reduce((sum, expenses) => sum + expenses.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expens) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expens.name} - $ ${expens.amount}
        <button data-id="${expens.id}">Remove</button>
        `;
      expenseList.appendChild(li);
    });
    saveExpenses();
  }

  expenseList.addEventListener('click', (e) =>{
    if (e.target.tagName === "BUTTON") {
        const id = parseInt(e.target.getAttribute('data-id'));
        removeExpenses(id)
    };
  });

  function removeExpenses(id){
    expenses = expenses.filter(expens => expens.id !== id);
    updateTotal();
    renderExpenses();
    saveExpenses();
  }

  function saveExpenses() {
    localStorage.setItem("expens", JSON.stringify(expenses));
    updateTotal()
  };
  renderExpenses()
});
