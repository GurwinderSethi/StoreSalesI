import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
    },
    reducers: {
        setCustomers(state, action) {
            console.log('Setting customers:', action.payload);
            state.customers = action.payload;
        },
        addCustomer(state, action) {
            console.log('Adding customer:', action.payload);
            state.customers.push(action.payload);
        },
        removeCustomer(state, action) {
            console.log('Removing customer:', action.payload);
            state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
    },
});

// Export actions
export const { setCustomers, addCustomer, removeCustomer } = customerSlice.actions;

// Export the reducer
export default customerSlice.reducer;