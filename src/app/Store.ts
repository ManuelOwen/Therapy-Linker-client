import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { doctorsApi } from "../features/Doctors/DoctorsAPI";
import { departmentsApi } from "../features/department/DepartmentAPI";
import {userAPI} from "../features/users/UserApi"
import userSlice from "../features/auth/UserSlice";
import  {loginAPI} from "../features/login/LoginAPI";
import {appointmentAPI} from '../features/MyAppointments/AppointmentsAPI';

// create persist config for only users registration
const authpersistConfig = {
  key : 'root',
  storage,
  whitelist: ['user'], // Only persist user state
  
}

const authReducer = combineReducers({
  user: userSlice,
  [doctorsApi.reducerPath]: doctorsApi.reducer,
  [departmentsApi.reducerPath]: departmentsApi.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [appointmentAPI.reducerPath]: appointmentAPI.reducer,
  [loginAPI.reducerPath]: loginAPI.reducer, // Add loginAPI.reducerPath here
});

const persistedReducer = persistReducer(authpersistConfig, authReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid serializability warnings
    }).concat(
      doctorsApi.middleware,
      departmentsApi.middleware,
      userAPI.middleware,
      loginAPI.middleware,
      appointmentAPI.middleware
    ),
});





export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;