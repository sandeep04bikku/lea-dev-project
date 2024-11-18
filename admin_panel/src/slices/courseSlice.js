import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addSingleCourse, addSingleLession, assignSingleCourse, changeSingleCourseStatus, changeSingleLessionStatus, courseList, courseReviewList, deleteSingleCourse, deleteSingleLession, enrollUserList, lessionList, updateSingleCourse, updateSingleLession } from "../apis/apiHandler";

export const course = createAsyncThunk(
    "course/list",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await courseList(payload);

            if (response?.code === 200 || response?.code === 404) {
                // console.log(response.data, "course slice");
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

export const addCourse = createAsyncThunk(
    "course/add",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await addSingleCourse(payload);

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


export const updateCourse = createAsyncThunk(
    "course/update",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await updateSingleCourse(payload);

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

export const deleteCourse = createAsyncThunk(
    "course/delete",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await deleteSingleCourse(payload);

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

export const changeCourseStatus = createAsyncThunk(
    "course/changeStatus",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await changeSingleCourseStatus(payload);

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

export const lession = createAsyncThunk(
    "lession/list",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await lessionList(payload);

            if (response?.code === 200 || response?.code === 404) {
                console.log(response.data, "course slice");
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

export const addLession = createAsyncThunk(
    "lession/add",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await addSingleLession(payload);

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


export const updateLession = createAsyncThunk(
    "lession/update",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await updateSingleLession(payload);

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

export const deleteLession = createAsyncThunk(
    "lession/delete",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await deleteSingleLession(payload);

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

export const changeLessionStatus = createAsyncThunk(
    "lession/changeStatus",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await changeSingleLessionStatus(payload);

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

export const enrollUser = createAsyncThunk(
    "course/enrollUser",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await enrollUserList(payload);

            if (response?.code === 200 || response?.code === 404) {
                // console.log(response.data, "course slice");
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const courseReview = createAsyncThunk(
    "course/review",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await courseReviewList(payload);

            if (response?.code === 200 || response?.code === 404) {
                // console.log(response.data, "course slice");
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        } catch (err) {
            console.log("err: ", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const assigncourse = createAsyncThunk(
    "course/assign",
    async ({ payload }, { rejectWithValue }) => {
        try {
            const response = await assignSingleCourse(payload);

            if (response?.code === 200) {
                // console.log(response.data, "course slice");
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

const initialState = {
    loading: false,
    courseList: [],
    addCourseData: {},
    updateCourseData: {},
    deleteCourseData: {},
    changeCourseStatusData: {},
    lessionList: [],
    addLessionData: {},
    updateLessionData: {},
    deleteLessionData: {},
    changeLessionStatusData: {},
    enrollUserList: [],
    courseReviewList: [],
    assignCourseData: {},
    error: null,
    success: false,
};

const courseSlice = createSlice({
    name: "course",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(course.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(course.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.courseList = payload;
                state.success = true;
            })
            .addCase(course.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(addCourse.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(addCourse.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.addCourseData = payload;
                state.success = true;
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(updateCourse.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.updateCourseData = payload;
                state.success = true;
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(deleteCourse.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.deleteCourseData = payload;
                state.success = true;
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(changeCourseStatus.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(changeCourseStatus.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.changeCourseStatusData = payload;
                state.success = true;
            })
            .addCase(changeCourseStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })

            .addCase(lession.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(lession.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.lessionList = payload;
                state.success = true;
            })
            .addCase(lession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(addLession.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(addLession.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.addLessionData = payload;
                state.success = true;
            })
            .addCase(addLession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(updateLession.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(updateLession.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.updateLessionData = payload;
                state.success = true;
            })
            .addCase(updateLession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(deleteLession.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(deleteLession.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.deleteLessionData = payload;
                state.success = true;
            })
            .addCase(deleteLession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(changeLessionStatus.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(changeLessionStatus.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.changeLessionStatusData = payload;
                state.success = true;
            })
            .addCase(changeLessionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(enrollUser.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(enrollUser.fulfilled, (state, { payload }) => {
                console.log("payload: ", payload);
                state.loading = false;
                state.enrollUserList = payload;
                state.success = true;
            })
            .addCase(enrollUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(courseReview.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(courseReview.fulfilled, (state, { payload }) => {
                // console.log("payload: ", payload);
                state.loading = false;
                state.courseReviewList = payload;
                state.success = true;
            })
            .addCase(courseReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
            .addCase(assigncourse.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new request
                state.success = false; // Reset success on new request
            })
            .addCase(assigncourse.fulfilled, (state, { payload }) => {
                // console.log("payload: ", payload);
                state.loading = false;
                state.assignCourseData = payload;
                state.success = true;
            })
            .addCase(assigncourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                state.success = false;
            })
    },
});

export default courseSlice.reducer;
