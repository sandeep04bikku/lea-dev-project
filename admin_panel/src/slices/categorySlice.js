import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addSingleCategory, categoryList, changeSingleCategoryStatus, deleteSingleCategory, updateSingleCategory } from "../apis/apiHandler";

export const category = createAsyncThunk(
    "Category/list",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await categoryList(payload);

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

export const addCategory = createAsyncThunk(
    "category/add",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await addSingleCategory(payload);

            if (response?.code === 200) {
                return response;
            } else {
                return rejectWithValue(response);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    "category/update",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await updateSingleCategory(payload);

            if (response?.code === 200) {
                return response;
            } else {
                return rejectWithValue(response);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "Category/delete",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await deleteSingleCategory(payload);

            if (response?.code === 200) {
                return response;
            } else {
                return rejectWithValue(response);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const changeCategoryStatus = createAsyncThunk(
    "category/changeStatus",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await changeSingleCategoryStatus(payload);

            if (response?.code === 200) {
                return response;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    loading: false,
    categoryList: [],
    addCategoryData: {},
    updateCategoryData: {},
    deleteCategoryData: {},
    changeCategoryStatusData: {},
    error: null,
    success: false,
};

const categorySlice = createSlice({
    name: "category",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(category.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(category.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.categoryList = payload;
                state.success = true;
            })
            .addCase(category.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(addCategory.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.addCategoryData = payload;
                state.success = true;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(updateCategory.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.updateCategoryData = payload;
                state.success = true;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.deleteCategoryData = payload;
                state.success = true;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(changeCategoryStatus.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(changeCategoryStatus.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.changeCategoryStatusData = payload;
                state.success = true;
            })
            .addCase(changeCategoryStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
    },
});

export default categorySlice.reducer;
