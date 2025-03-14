import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/user";

type InitialState = {
  value: User;
  isLoggedIn: boolean;
};

const initialState = {
  value: {
    id: "",
    lastname: "",
    firstname: "",
    email: "",
    phoneNumber: "",
    username: "",
    passwordUpdated: false,
    resetPasswordTimestamp: 0,
    resetPasswordToken: "",
    enabled: false,
    loginAttempt: 0,
    roleId: "",
    createdAt: "",
    updatedAt: "",
  },
  isLoggedIn: false,
} as InitialState;

export const userAccount = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loginUser: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
        isLoggedIn: true,
      };
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.value = null;
    },
  },
});

export const { loginUser, logOut } = userAccount.actions;
export default userAccount.reducer;
