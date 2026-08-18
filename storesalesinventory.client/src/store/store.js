import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import productReducer from './slices/productSlice';
import storeReducer from './slices/storeSlice';
import saleReducer from './slices/saleSlice';
const store = configureStore({
    reducer: {
        customers: customerReducer,
        products: productReducer,
        stores: storeReducer,
        sales: saleReducer,
    },
});

export default store;