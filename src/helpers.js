export const calculateSpentByBudget = (budget) => {
  const expenses = budget.expenses || [];
  let budgetSpent = 0;
  expenses.forEach((expense) => {
    if (expense.budget_id === budget.id) {
      budgetSpent += expense.amount;
    }
  });
  return budgetSpent;
};

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};
