import { STATE_NAME } from "../constants/state";

export const saveState = (state) => {
  localStorage.setItem(STATE_NAME, JSON.stringify(state));
  window.dispatchEvent(new Event("storage"));
};

export const getState = () => {
  return JSON.parse(localStorage.getItem(STATE_NAME));
};

export const calculateExpenses = (expenses) => {
  return expenses.reduce((acc, curr) => acc + Number(curr.price), 0);
};

export const generateId = () => {
  return `${Date.now()}-${Math.ceil(Math.random() * 9999)}`;
};

export const addExpense = (title, date, category, price) => {
  if (!price || price <= 0) return;
  if (!category || !date || !title) return;

  const newExpense = {
    id: generateId(),
    title,
    date,
    category,
    price: price,
  };
  const state = getState();
  if (state.walletBalance < price) {
    alert("Low Wallet Balance");
    return;
  }
  state.expenseList = [...state.expenseList, newExpense];
  state.walletBalance -= price;

  saveState(state);
};

export const editExpense = (id, title, date, category, price) => {
  if (!price || price <= 0) return;
  if (!category || !date || !title) return;

  const newExpense = {
    id,
    title,
    date,
    category,
    price,
  };
  const state = getState();
  if (state.walletBalance < price) {
    alert("Low Wallet Balance");
    return;
  }
  state.expenseList = state.expenseList.map((expense) => {
    if (expense.id !== id) return expense;
    return newExpense;
  });

  state.walletBalance -= price;
  saveState(state);
};
export const deleteExpense = (id) => {
  const state = getState();
  state.expenseList = state.expenseList.filter((expense) => expense.id !== id);
  saveState(state);
};

export const generatePieChartData = (expenses) => {
  const sumByCategory = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((acc, curr) => acc + Number(curr.price), 0);
  };
  return [
    {
      name: "Food",
      value: sumByCategory("Food"),
      fill: "var(--orange-dark-color)",
    },
    {
      name: "Entertainment",
      value: sumByCategory("Entertainment"),
      fill: "var(--purple-dark-color)",
    },
    {
      name: "Travel",
      value: sumByCategory("Travel"),
      fill: "var(--yellow-color)",
    },
  ];
};
