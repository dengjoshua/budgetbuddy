import { Link } from "react-router-dom";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../api";
import { format, parseISO } from "date-fns";

const cookies = new Cookies();
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllExpenses = async () => {
    setIsLoading(true);
    const cookie = cookies.get("auth_token");
    try {
      const response = await axios.get(`${BASE_URL}/expenses`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setExpenses(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllBudgets = async () => {
    setIsLoading(true);
    const cookie = cookies.get("auth_token");
    try {
      const response = await axios.get(`${BASE_URL}/budgets`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setBudgets(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllExpenses();
    fetchAllBudgets();
    setIsLoading(true);
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "PPPppp");
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid date";
    }
  };

  // Array of TailwindCSS color classes for borders and text
  const colorClasses = [
    "border-red-500 text-red-500",
    "border-yellow-500 text-yellow-500",
    "border-green-500 text-green-500",
    "border-blue-500 text-blue-500",
    "border-indigo-500 text-indigo-500",
    "border-purple-500 text-purple-500",
    "border-pink-500 text-pink-500",
    "border-gray-500 text-gray-500",
    "border-teal-500 text-teal-500",
    "border-orange-500 text-orange-500",
  ];

  // Array of TailwindCSS color classes for progress bars
  const progressBarClasses = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-gray-500",
    "bg-teal-500",
    "bg-orange-500",
  ];

  // Array of TailwindCSS color classes for table rows
  const tableRowClasses = ["bg-gray-50", "bg-white"];

  return (
    <>
      {isLoading ? (
        <h1 className="text-center text-4xl text-gray-700">Loading...</h1>
      ) : (
        <div className="w-full m-4 p-4">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Welcome back, <span className="text-[#9ac23d]">User</span>
          </h1>
          <div className="flex flex-col gap-6">
            <div className="flex w-full gap-6">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>
            {budgets && budgets.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                  Existing Budgets
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {budgets.map((budget, index) => (
                    <div
                      key={budget.id}
                      className={`p-4 rounded-md border-2 ${
                        colorClasses[index % colorClasses.length]
                      }`}
                    >
                      <BudgetItem
                        budget={budget}
                        progressBarClass={
                          progressBarClasses[index % progressBarClasses.length]
                        }
                        showDelete={true}
                      />
                    </div>
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      Recent Expenses
                    </h2>
                    <Table expenses={expenses} />
                    {expenses.length > 8 && (
                      <Link
                        to="expenses"
                        className="btn bg-[#9ac23d] text-white font-semibold py-2 px-4 rounded-md mt-4"
                      >
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <p className="text-lg text-gray-600">
                  Personal budgeting is the secret to financial freedom.
                </p>
                <p className="text-lg text-gray-600">
                  Create a budget to get started!
                </p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Dashboard;
