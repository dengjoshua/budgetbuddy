import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api";
import Cookie from "universal-cookie";

const cookies = new Cookie();

const AddBudgetForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();

  const handleSubmit = async () => {
    const cookie = cookies.get("auth_token");
    const date = Date.now();
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${BASE_URL}/budgets`,
        {
          name: name,
          amount: amount,
          created_at: date,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
      setName("");
      setAmount(0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-md w-1/2 border-2 border-zinc-800 p-2 border-dashed">
      <h2 className="text-xl font-bold mb-4">Create budget</h2>
      <div className="grid gap-2">
        <label htmlFor="newBudget" className="text-lg">
          Budget Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="e.g., Groceries"
          required
          value={name}
          className="border p-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="newBudgetAmount" className="text-lg">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          name="amount"
          id="amount"
          placeholder="e.g., $350"
          required
          value={amount}
          inputMode="decimal"
          className="border p-2 rounded"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
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
            <span>Create budget</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AddBudgetForm;
