import "./App.css";
import Card from "./components/Card";
import PieChart from "./components/PieChart";
import PaginatedList from "./components/PaginatedList";
import BarGraph from "./components/BarGraph";
import { addExpensesForm, addIncomeForm } from "./constants/form";
import useStore from "./hook/useState";
import { useEffect, useState } from "react";
import {
  calculateExpenses,
  generatePieChartData,
  getState,
} from "./utils/ExpenseUtils";

function App() {
  const { getStore } = useStore();
  const [store, setStore] = useState(getStore());

  useEffect(() => {
    window.addEventListener("storage", () => {
      const store = getState();
      setStore(store);
    });
  }, []);
  return (
    <main className="App">
      <h1>Expense Tracker</h1>
      <section className="top-section">
        <Card
          heading={"Wallet Balance:"}
          amt={store.walletBalance}
          formData={addIncomeForm}
        />
        <Card
          heading={"Expenses:"}
          amt={calculateExpenses(store.expenseList)}
          formData={addExpensesForm}
        />
        <PieChart data={generatePieChartData(store.expenseList)} />
      </section>
      <section className="bottom-section">
        <div style={{ flexBasis: "65%" }}>
          <h3>Recent Transactions</h3>
          <PaginatedList list={store.expenseList} />
        </div>
        <div style={{ flexBasis: "35%" }}>
          <h3>Top Expenses</h3>
          <BarGraph data={generatePieChartData(store.expenseList)} />
        </div>
      </section>
    </main>
  );
}

export default App;
