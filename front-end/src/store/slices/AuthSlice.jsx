import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (result.status !== 0) return rejectWithValue(result.message);
    localStorage.setItem('token', result.data.token);
    return result;
  } catch (error) {
    return rejectWithValue('Terjadi kesalahan koneksi ke server');
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`${BASE_URL}/profile`, {
      headers: getAuthHeader(),
    });
    const result = await response.json();

    if (result.status === 108 || response.status === 401) {
      dispatch(logout());
      return rejectWithValue('Sesi Anda telah berakhir. Silakan login kembali.');
    }

    if (result.status !== 0) return rejectWithValue(result.message);
    return result.data;
  } catch (error) {
    return rejectWithValue('Gagal memuat profil');
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`${BASE_URL}/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (result.status === 108 || response.status === 401) {
      dispatch(logout());
      return rejectWithValue('Sesi berakhir');
    }

    if (result.status !== 0) return rejectWithValue(result.message);
    return result.data;
  } catch (error) {
    return rejectWithValue('Gagal memperbarui profil');
  }
});

export const updateProfileImage = createAsyncThunk('auth/updateProfileImage', async (file, { rejectWithValue, dispatch }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/profile/image`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: formData,
    });
    const result = await response.json();

    if (result.status === 108 || response.status === 401) {
      dispatch(logout());
      return rejectWithValue('Sesi berakhir');
    }

    if (result.status !== 0) return rejectWithValue(result.message);
    return result.data;
  } catch (error) {
    return rejectWithValue('Gagal mengunggah gambar profil');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload;
        if (action.payload === 'Sesi Anda telah berakhir. Silakan login kembali.') {
          state.token = null;
          state.user = null;
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
