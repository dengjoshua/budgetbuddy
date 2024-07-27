import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (i, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-lg font-bold text-gray-700 uppercase tracking-wide"
                >
                  {i}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense, index) => (
            <tr
              key={expense.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
