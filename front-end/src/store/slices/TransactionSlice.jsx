import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const getBalance = createAsyncThunk('transaction/getBalance', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/balance`, { headers: getAuthHeader() });
    const result = await response.json();
    if (result.status !== 0) return rejectWithValue(result.message);
    return result.data.balance;
  } catch (err) {
    return rejectWithValue('Gagal terhubung ke server');
  }
});

export const topUp = createAsyncThunk('transaction/topUp', async (amount, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/topup`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ top_up_amount: amount }),
    });
    const result = await response.json();
    if (result.status !== 0) return rejectWithValue(result.message);
    return result.data.balance;
  } catch (err) {
    return rejectWithValue('Masalah koneksi server');
  }
});

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (serviceCode, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/transaction`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ service_code: serviceCode }),
    });
    const result = await response.json();
    if (result.status !== 0) return rejectWithValue(result.message);
    return result.data;
  } catch (err) {
    return rejectWithValue('Masalah koneksi server');
  }
});

export const getHistory = createAsyncThunk('transaction/getHistory', async ({ offset, limit }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/transaction/history?offset=${offset}&limit=${limit}`, {
      headers: getAuthHeader(),
    });
    const result = await response.json();
    if (result.status !== 0) return rejectWithValue(result.message);
    return result.data.records;
  } catch (err) {
    return rejectWithValue('Gagal mengambil riwayat');
  }
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    balance: 0,
    history: [],
    loading: false,
    hasMore: true,
  },
  reducers: {
    resetHistory: (state) => {
      state.history = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(topUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(topUp.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(topUp.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.balance -= action.payload.total_amount;
      })
      .addCase(getHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length < 5) state.hasMore = false;
        state.history = [...state.history, ...action.payload];
      })
      .addCase(getHistory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetHistory } = transactionSlice.actions;
export default transactionSlice.reducer;
