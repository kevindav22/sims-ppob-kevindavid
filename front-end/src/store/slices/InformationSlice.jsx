import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

export const getBanners = createAsyncThunk('info/getBanners', async () => {
  const response = await fetch(`${BASE_URL}/banner`);
  const result = await response.json();
  return result.data;
});

export const getServices = createAsyncThunk('info/getServices', async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/services`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  return result.data;
});

const informationSlice = createSlice({
  name: 'information',
  initialState: { banners: [], services: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload;
      });
  },
});

export default informationSlice.reducer;
