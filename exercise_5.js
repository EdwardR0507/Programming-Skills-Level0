// 5. Develop a finance management application with the following features:
// * The user records their total income.
// * There are categories: Medical expenses, household expenses, leisure, savings, and education.
// * The user can list their expenses within the categories and get the total for each category.
// * The user can obtain the total of their expenses.
// * If the user spends the same amount of money they earn, the system should display a message advising the user to reduce expenses in the category where they have spent the most money.
// * If the user spends less than they earn, the system displays a congratulatory message on the screen.
// * If the user spends more than they earn, the system will display advice to improve the user's financial health.

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let totalIncome = 0;
let categories = {
  "Medical expenses": [],
  "Household expenses": [],
  Leisure: [],
  Savings: [],
  Education: [],
};

const recordIncome = () => {
  readline.question("Enter your total income: ", (income) => {
    totalIncome = parseFloat(income);
    console.log(`Total income recorded: $${totalIncome}`);
    showMenu();
  });
};

const showMenu = () => {
  console.log("1. Record expenses");
  console.log("2. List expenses by category");
  console.log("3. Get total expenses");
  console.log("4. Exit");

  readline.question("Select an option: ", (option) => {
    switch (option) {
      case "1":
        recordExpenses();
        break;
      case "2":
        listExpensesByCategory();
        break;
      case "3":
        getTotalExpenses();
        break;
      case "4":
        console.log("Thank you for using the finance management application.");
        readline.close();
        break;
      default:
        console.log("Invalid option. Please try again.");
        showMenu();
    }
  });
};

const recordExpenses = () => {
  console.log("Select a category to record expenses:");
  console.log(
    Object.keys(categories)
      .map((category, index) => `${index + 1}. ${category}`)
      .join("\n")
  );

  readline.question("Select a category: ", (category) => {
    switch (category) {
      case "1":
        recordExpense(Object.keys(categories)[0]);
        break;
      case "2":
        recordExpense(Object.keys(categories)[1]);
        break;
      case "3":
        recordExpense(Object.keys(categories)[2]);
        break;
      case "4":
        recordExpense(Object.keys(categories)[3]);
        break;
      case "5":
        recordExpense(Object.keys(categories)[4]);
        break;
      default:
        console.log("Invalid category. Please try again.");
        recordExpenses();
    }
  });
};

const recordExpense = (category) => {
  readline.question(`Enter the expense for ${category}: `, (expense) => {
    const amount = parseFloat(expense);
    if (isNaN(amount) || amount <= 0) {
      console.log("Invalid expense amount. Please try again.");
      recordExpense(category);
    } else {
      categories[category].push(amount);
      console.log(`Expense of $${amount} recorded for ${category}.`);
      showMenu();
    }
  });
};

const listExpensesByCategory = () => {
  console.log("Expenses by category:");
  for (let category in categories) {
    const total = categories[category].reduce((acc, curr) => acc + curr, 0);
    console.log(`${category}: $${total}`);
  }
  showMenu();
};

const getTotalExpenses = () => {
  const totalExpenses = Object.values(categories)
    .flat()
    .reduce((acc, curr) => acc + curr, 0);
  console.log(`Total expenses: $${totalExpenses}`);

  if (totalExpenses === totalIncome) {
    const maxCategory = Object.keys(categories).reduce(
      (max, category) => {
        const total = categories[category].reduce((acc, curr) => acc + curr, 0);
        return total > max.total ? { category, total } : max;
      },
      { category: "", total: 0 }
    );

    console.log(
      `You have spent all your income. Reduce expenses in ${maxCategory.category}.`
    );
  } else if (totalExpenses < totalIncome) {
    console.log("Congratulations! You are spending less than you earn.");
  } else {
    console.log(
      "You are spending more than you earn. Improve your financial health."
    );
  }

  showMenu();
};

recordIncome();
