import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
const axios = axiosInstance;

// ✅ 1. Fix: Add the action type (e.g., 'customer/list')
export const customerList = createAsyncThunk('customer/list', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/customer');
        const resData = response.data;

        if (resData.status !== "success") {
            return thunkAPI.rejectWithValue(resData.msg || "Fetch failed");
        }

        return resData.data; // ✅ return only the customer array
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || "Fetch failed");
    }
});

export const customerUpdate = createAsyncThunk('customer/update', async (data, thunkAPI) => {
    try{
      const response = await axios.put(`/api/customer/${data.id}`, data.data);
      const resData = response.data;

      if (resData.status !== "success") {
        return thunkAPI.rejectWithValue(resData.msg || "Update failed");
      }

      return resData.data;
    }catch(error){
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Update failed");
    }
})



export const customerAdd = createAsyncThunk('customer/add', async (data, thunkAPI) => {
    try {
        const response = await axios.post('/api/customer/', data);
        const resData = response.data;

        if (resData.status !== "success") {
            return thunkAPI.rejectWithValue(resData.msg || "Add failed");
        }

        return resData.data; // ✅ return only the customer array

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || "Add failed");
    }
});



const initialState = {
    customerList: [],
    loading: false,
    error: null,
    success: false,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(customerList.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(customerList.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customerList = action.payload; // ✅ directly using the customer array
            })
            .addCase(customerList.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(customerAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(customerAdd.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customerList.push(action.payload); // ✅ Append instead of replace
            })
            .addCase(customerAdd.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || action.error.message;
            })

            .addCase(customerUpdate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(customerUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.customerList = state.customerList.map((customer) =>
                    customer.id === action.payload.id ? action.payload : customer
                );
            })
            .addCase(customerUpdate.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || action.error.message;
            });
}
});

export default customerSlice.reducer;
