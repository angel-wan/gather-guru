import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../utility/authToken";
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3000";
// get jwt from local storage

export enum ExpenseType {
  EVENT = "Event",
  GROUP = "Group",
}
export interface CreateExpenseType {
  title: string;
  type: ExpenseType;
}

export interface ExpenseItem {
  title: string;
  amount: number;
}

export interface AddExpenseItemType {
  expenseId: string;
  expenses: [ExpenseItem];
}

export interface RemoveExpenseItemType {
  expenseId: string;
  expenseItemId: string;
}

export const createExpenseGroup = createAsyncThunk(
  "expense/create",
  async (data: CreateExpenseType, { rejectWithValue }) => {
    const { title, type } = data;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Place the JWT into the request header - remember the space after 'Bearer
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendURL}/expense`,
        { title, type },
        config
      );
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeExpense = createAsyncThunk(
  "expense/removeExpense",
  async (expenseId: string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Place the JWT into the request header - remember the space after 'Bearer
          "Content-Type": "application/json",
        },
      };
      const response = await axios.delete(
        `${backendURL}/expense/${expenseId}`,
        config
      );
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const listExpense = createAsyncThunk(
  "expense",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Place the JWT into the request header - remember the space after 'Bearer
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${backendURL}/expense`, config);
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getExpenseById = createAsyncThunk(
  "expense/getbyid",
  async (expenseId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendURL}/expense/${expenseId}`,
        config
      );

      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addExpenseItem = createAsyncThunk(
  "expense/addExpenseItem",
  async (data: AddExpenseItemType, { rejectWithValue }) => {
    const { expenseId, expenses } = data;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Place the JWT into the request header - remember the space after 'Bearer
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendURL}/expense/${expenseId}`,
        { expenses },
        config
      );
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeExpenseItem = createAsyncThunk(
  "expense/removeExpenseItem",
  async (data: RemoveExpenseItemType, { rejectWithValue }) => {
    const { expenseId, expenseItemId } = data;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Place the JWT into the request header - remember the space after 'Bearer
          "Content-Type": "application/json",
        },
      };
      const response = await axios.delete(
        `${backendURL}/expense/${expenseId}/${expenseItemId}`,
        config
      );
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      // return custom error message from the backend if present
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getExpenseSummary = createAsyncThunk(
  "expense/getExpenseSummary",
  async (expenseId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendURL}/expense/${expenseId}/summary`,
        config
      );
      console.log(response.data);
      return await response.data; // Assuming the API returns a string (e.g., a token)
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
