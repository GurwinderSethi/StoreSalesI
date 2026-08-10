import { createSlice } from '@reduxjs/toolkit';

const saleSlice = createSlice({
    name: 'sales',
    initialState: {
        sales: [],
    },
    reducers: {
        setSales(state, action) {
            console.log('Setting sales:', action.payload);
            state.sales = action.payload;
            console.log('state.sales =', state.sales);
        },
        addSale(state, action) {
            console.log('Adding sale:', action.payload);
            state.sales.push(action.payload);
        },
        removeSale(state, action) {
            console.log('Removing sale:', action.payload);
            state.sales = state.sales.filter(sale => sale.id !== action.payload);
        },
    },
});

// Export actions
export const { setSales, addSale, removeSale } = saleSlice.actions;

// Export the reducer
export default saleSlice.reducer;