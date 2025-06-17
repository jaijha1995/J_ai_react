import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
const axios = axiosInstance;

export const fetchCompany = createAsyncThunk(
  "company/list",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/company/company_list/");
      const restData = response.data;

      if (restData.status !== "success") {
        return thunkAPI.rejectWithValue(restData.msg || "Fetch failed");
      }

      return restData.data; // Return only company data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



export const addCompany = createAsyncThunk(
  "company/add",  
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/api/company/company/", data);
      const resData = response.data;
      if (resData.status !== "success") {
        return thunkAPI.rejectWithValue(resData.msg || "Add failed");
      }
      return resData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Add failed");
    }
  });




const initialState = {
  companyList: [],
  loading: false,
  error: null,
  success: false,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.companyList = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(addCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.companyList.push(action.payload); // Assuming the payload is the new company
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default companySlice.reducer;
