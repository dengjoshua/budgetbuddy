import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { calculateSpentByBudget, formatPercentage } from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount } = budget;
  const spent = calculateSpentByBudget(budget);

  return (
    <div className="budget p-4 ">
      <div className="progress-text flex justify-between mb-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-lg">{amount} Budgeted</p>
      </div>
      <progress
        max={amount}
        value={spent}
        className="w-full mb-2 progress-text"
      >
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text text-lg font-bold flex justify-between mb-2">
        <small>{spent} spent</small>
        <small>{amount - spent} remaining</small>
      </div>
      <div className="flex-sm mt-2">
        <Link
          to={`/budget/${id}`}
          className="btn bg-gray-400 text-white py-2 px-4 rounded"
        >
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default BudgetItem;
