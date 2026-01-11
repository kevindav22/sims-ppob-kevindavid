import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import informationReducer from './slices/InformationSlice';
import transactionReducer from './slices/TransactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    information: informationReducer,
    transaction: transactionReducer,
  },
});
