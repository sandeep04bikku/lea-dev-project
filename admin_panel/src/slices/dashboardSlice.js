import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cityList, countryList, dashboard } from "../apis/apiHandler";

export const adminDashboard = createAsyncThunk(
    "dashboard/adminDashboard",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await dashboard(payload);

            if (response?.code === 200 || response?.code === 404) {
                return response.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const country = createAsyncThunk(
    "dashboard/country",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await countryList(payload);

            if (response?.code === 200 || response?.code === 404) {
                return response.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const city = createAsyncThunk(
    "dashboard/city",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await cityList(payload);

            if (response?.code === 200 || response?.code === 404) {
                return response.data;
            } else {
                return rejectWithValue(response);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    loading: false,
    dashboardInfo: {},
    countryList:[],
    cityList:[],
    error: null,
    success: false,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(adminDashboard.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(adminDashboard.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.dashboardInfo = payload;
                state.success = true;
            })
            .addCase(adminDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(country.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(country.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.countryList = payload;
                state.success = true;
            })
            .addCase(country.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(city.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(city.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.cityList = payload;
                state.success = true;
            })
            .addCase(city.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
    },
});

export default dashboardSlice.reducer;
