import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDateToLocaleString } from "../helpers";
import { FaTrashCan } from "react-icons/fa6";

const ExpenseItem = ({ expense, showBudget = false }) => {
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`/api/expenses/${expense.id}/delete`, {
        action: "deleteExpense",
        expenseId: expense.id,
      });
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const budget = expense.budget;

  return (
    <>
      <td>{expense.name}</td>
      <td>{expense.amount}</td>
      <td>{formatDateToLocaleString(expense.date)}</td>
      {showBudget && (
        <td>
          <Link to={`/budget/${budget.id}`} className="text-blue-500">
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <form onSubmit={handleDelete}>
          <button
            type="submit"
            className="text-white py-2 px-4 rounded"
            aria-label={`Delete ${expense.name} expense`}
          >
            <FaTrashCan size={20} color="red" />
          </button>
        </form>
      </td>
    </>
  );
};

export default ExpenseItem;
