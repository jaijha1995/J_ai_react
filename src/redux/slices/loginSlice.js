// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Super Admin Login
// export const AdminLogin = createAsyncThunk('auth/superadmin', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post('http://143.110.242.217:8018/api/superadmin/login', data);
//     if (response.data.status !== "success") {
//       return thunkAPI.rejectWithValue(response.data.msg || "Admin login failed");
//     }
//     return response.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.msg || "Admin login failed");
//   }
// });



// // User Login
// export const UserLogin = createAsyncThunk('auth/user', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post('http://143.110.242.217:8018/api/customer/login', data);
//     if (response.data.status !== "success") {
//       return thunkAPI.rejectWithValue(response.data.msg || "User login failed");
//     }
//     return response.data; // ✅ Return full response (data + access_token)
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.msg || "User login failed");
//   }
// });

// const initialState = {
//   loginData: null,
//   loading: false,
//   success: false,
//   error: null,
// };

// const loginSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     resetLogin: (state) => {
//       state.loginData = null;
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Superadmin
//       .addCase(AdminLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(AdminLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.loginData = action.payload.data;
//       })
//       .addCase(AdminLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload;
//       })

//       // User
//       .addCase(UserLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(UserLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;

//         const { data, access_token, refresh_token } = action.payload;
//         state.loginData = {
//           ...data,
//           access_token,
//           refresh_token,
//         };
//       })
//       .addCase(UserLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { resetLogin } = loginSlice.actions;
// export default loginSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
const axios = axiosInstance;


export const AdminLogin = createAsyncThunk('auth/superadmin', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/api/superadmin/login', data);
    if (response.data.status !== "success") {
      return thunkAPI.rejectWithValue(response.data.msg);
    }
    return {
      ...response.data.data,
      access_token: response.data.access_token,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || "Admin login failed");
  }
});

export const UserLogin = createAsyncThunk('auth/user', async (data, thunkAPI) => {
  try {
    const response = await axios.post('/api/customer/login', data);
    if (response.data.status !== "success") {
      return thunkAPI.rejectWithValue(response.data.msg);
    }
    return {
      ...response.data.data,
      access_token: response.data.access_token,
      api_key: response.data.api_key,
    };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || "User login failed");
  }
});

const initialState = {
  loginData: null,
  loading: false,
  success: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.loginData = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminLogin.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(AdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loginData = action.payload;
      })
      .addCase(AdminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.loginData = action.payload;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
