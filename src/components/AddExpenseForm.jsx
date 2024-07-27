import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../api";

const cookies = new Cookies();

const AddExpenseForm = ({ budgets }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [selectedBudgetId, setSelectedBudgetId] = useState(
    budgets.length === 1 ? budgets[0].id : ""
  );

  useEffect(() => {
    if (budgets.length === 1) {
      setSelectedBudgetId(budgets[0].id);
    }
  }, [budgets]);

  const handleSubmit = async () => {
    const cookie = cookies.get("auth_token");
    const date = Date.now();
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${BASE_URL}/expenses`,
        {
          name: name,
          amount: amount,
          created_at: date,
          budget_id: selectedBudgetId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      console.log(response.data);
      setName("");
      setAmount(0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-md border-2 border-zinc-800 p-4 border-dashed w-full md:w-2/3 lg:w-1/2 mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets[0].name}`}
        </span>{" "}
        Expense
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-lg">
            Expense Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g., Coffee"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="newExpenseAmount" className="text-lg">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            name="newExpenseAmount"
            id="newExpenseAmount"
            placeholder="e.g., 3.50"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>
      <div className="grid gap-2 mb-4" hidden={budgets.length === 1}>
        <label htmlFor="newExpenseBudget" className="text-lg">
          Budget Category
        </label>
        <select
          name="newExpenseBudget"
          id="newExpenseBudget"
          required
          value={selectedBudgetId}
          onChange={(e) => setSelectedBudgetId(e.target.value)}
          className="border p-2 rounded"
        >
          {budgets
            .sort((a, b) => a.created_at - b.created_at)
            .map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex justify-start">
        <button
          type="submit"
          className="p-2 bg-black text-white rounded-md mt-3 text-lg text-center"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Add Expense</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
