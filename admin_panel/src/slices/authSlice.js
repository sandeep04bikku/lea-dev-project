import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, login, otpVerification, resetPassword, changePassword, resendNewOtp } from "../apis/apiHandler";
import {
  getToken,
  getUserDataFromLocal,
  removeUserDataFromLocal,
  saveUserDataToLocal,
} from "../common/LocalStorageService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ payload }, { rejectWithValue }) => {
    try {

      const response = await login(payload);

      if (response?.code === 200) {
        console.log(response?.data, "auth response17");
        saveUserDataToLocal(response.data);

        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ payload }, { rejectWithValue }) => {
    try {

      const response = await forgotPassword(payload);

      if (response?.code === 200) {

        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ payload }, { rejectWithValue }) => {
    try {

      const response = await resendNewOtp(payload);

      if (response?.code === 200) {

        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const otpverify = createAsyncThunk(
  "auth/otpVerification",
  async ({ payload }, { rejectWithValue }) => {
    try {

      const response = await otpVerification(payload);

      if (response?.code === 200) {
        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const setPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ payload }, { rejectWithValue }) => {
    try {

      const response = await resetPassword(payload);

      if (response?.code === 200) {

        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const changeNewPassword = createAsyncThunk(
  "auth/changePassword",
  async ({ payload }, { rejectWithValue }) => {
    try {

      const response = await changePassword(payload);

      if (response?.code === 200) {

        return response;
      } else {
        return rejectWithValue(response);
      }
    } catch (err) {
      console.log("err: ", err);
      return rejectWithValue(err.response.data);
    }
  }
);

const userToken = getToken();
// console.log("userToken: ", userToken);

const initialState = {
  loading: false,
  userInfo: getUserDataFromLocal(),
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      removeUserDataFromLocal(); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        // console.log("payload: ", payload);
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // console.log("action: ", action);
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, { payload }) => {
        // console.log("payload: ", payload);
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        // console.log("action: ", action);
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state, { payload }) => {
        // console.log("payload: ", payload);
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        // console.log("action: ", action);
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(otpverify.pending, (state) => {
        state.loading = true;
      })
      .addCase(otpverify.fulfilled, (state, { payload }) => {
        // console.log("payload: ", payload);
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(otpverify.rejected, (state, action) => {
        // console.log("action: ", action);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(setPassword.fulfilled, (state, { payload }) => {
        // console.log("payload: ", payload);
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(setPassword.rejected, (state, action) => {
        // console.log("action: ", action);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeNewPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeNewPassword.fulfilled, (state, { payload }) => {
        // console.log("payload: ", payload);
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(changeNewPassword.rejected, (state, action) => {
        // console.log("action: ", action);
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
