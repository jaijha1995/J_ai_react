import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
const axios = axiosInstance;
import { jwtDecode } from "jwt-decode";

 // ✅ correct import

// Get all modules (for superadmin)
export const AllModules = createAsyncThunk('module/list', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/moduler/modular/');
        const resData = response.data;

        if (resData.status !== "success") {
            return thunkAPI.rejectWithValue(resData.msg || "Fetch failed");
        }

        return resData.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || "Fetch failed");
    }
});


export const getModuleById = createAsyncThunk('module/getById', async (apiKey, thunkAPI) => {
    try {
        const response = await axios.get(`/api/company/company/data/?api_key=${apiKey}`);
        const resData = response.data;

        if (resData.status !== "success") {
            return thunkAPI.rejectWithValue(resData.msg || "Fetch failed hhh");
        }

        // ✅ Decode the token
        const decoded = jwtDecode(resData?.token);
        console.log("Decoded data:", decoded);
        const modulerArray = decoded?.company?.moduler || [];

        // Add decryptedUrl field
        const finalModules = modulerArray.map((mod) => ({
            ...mod,
            decryptedUrl: mod.url || "", // URL might already be plain
        }));

        return finalModules;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || "Fetch failed");
    }
});

// Add a new module (admin feature)
export const moduleAdd = createAsyncThunk('module/add', async (formData, thunkAPI) => {
    try {
        const response = await axios.post('/api/moduler/modular/', formData);
        const resData = response.data;

        if (resData.status !== "success") {
            return thunkAPI.rejectWithValue(resData.msg || "Add failed");
        }

        return resData.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || "Add failed");
    }
});



// Initial state
const initialState = {
    moduleList: [],
    loading: false,
    error: null,
    success: false,
};

// Module slice
const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔸 AllModules
            .addCase(AllModules.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(AllModules.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.moduleList = action.payload;
            })
            .addCase(AllModules.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || action.error.message;
            })

        
            // 🔸 getModuleById
             .addCase(getModuleById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getModuleById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.moduleList = action.payload;
            })
            .addCase(getModuleById.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || action.error.message;
            })

            // 🔸 moduleAdd
            .addCase(moduleAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(moduleAdd.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.moduleList.push(action.payload);
            })
            .addCase(moduleAdd.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || action.error.message;
            });
    },
});



export default moduleSlice.reducer;
