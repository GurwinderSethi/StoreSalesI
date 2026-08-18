import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
    },
    reducers: {
        setCustomers(state, action) {
           
            state.customers = action.payload;
        },
        addCustomer(state, action) {
           
            state.customers.push(action.payload);
        },
        removeCustomer(state, action) {
             state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
    },
});

// Export actions
export const { setCustomers, addCustomer, removeCustomer } = customerSlice.actions;

// Export the reducer
export default customerSlice.reducer;