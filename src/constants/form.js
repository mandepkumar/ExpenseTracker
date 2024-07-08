import {
  addExpense,
  editExpense,
  getState,
  saveState,
} from "../utils/ExpenseUtils";

export const addExpensesForm = {
  title: "Add Expenses",
  bgColor: " --gradient-green",
  actionBtn: {
    name: "Add Expense",
    bgColor: "--orange-light-color",
    color: "white",
    onClickAction: (form) => {
      const { category, date, price, title } = form;
      addExpense(title, date, category, Number(price));
    },
  },
  controllers: [
    { type: "text", placeholder: "title", id: "title" },
    { type: "number", placeholder: "Price", id: "price" },
    {
      id: "category",
      type: "drop-down",
      placeholder: "Select Category",
      options: [
        {
          id: "expense-category-option-entertainment",
          name: "Entertainment",
          value: "Entertainment",
        },
        { id: "expense-category-option-food", name: "Food", value: "Food" },
        {
          id: "expense-category-option-travel",
          name: "Travel",
          value: "Travel",
        },
      ],
    },
    { id: "date", type: "date", placeholder: "dd/mm/yyyy" },
  ],
};

export const editExpensesForm = {
  title: "Edit Expenses",
  color: "white",
  bgColor: " --gradient-green",
  actionBtn: {
    name: "Add Expense",
    bgColor: "--orange-light-color",
    color: "white",
    onClickAction: (form) => {
      const { id, category, date, price, title } = form;
      editExpense(id, title, date, category, Number(price));
    },
  },
  controllers: [
    { type: "text", placeholder: "title", id: "title" },
    { type: "number", placeholder: "Price", id: "price" },
    {
      id: "category",
      type: "drop-down",
      placeholder: "Select Category",
      options: [
        {
          id: "expense-category-option-entertainment",
          name: "Entertainment",
          value: "Entertainment",
        },
        { id: "expense-category-option-food", name: "Food", value: "Food" },
        {
          id: "expense-category-option-travel",
          name: "Travel",
          value: "Travel",
        },
      ],
    },
    { id: "date", type: "date", placeholder: "dd/mm/yyyy" },
  ],
};

export const addIncomeForm = {
  title: "Add Balance",
  actionBtn: {
    name: "Add Balance",
    bgColor: "--orange-light-color",
    color: "white",
    onClickAction: (data) => {
      const amt = Number(data["income-amt"]);
      if (!amt || amt <= 0) return;
      const state = getState();
      state.walletBalance += amt;
      saveState(state);
    },
  },
  color: "black",
  bgColor: " --gradient-red",
  controllers: [
    { type: "number", placeholder: "Income Amount", id: "income-amt" },
  ],
};
