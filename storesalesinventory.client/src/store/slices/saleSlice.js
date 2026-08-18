import { createSlice } from '@reduxjs/toolkit';

const saleSlice = createSlice({
    name: 'sales',
    initialState: {
        sales: [],
    },
    reducers: {
        setSales(state, action) {
            
            state.sales = action.payload;
           
        },
        addSale(state, action) {
           
            state.sales.push(action.payload);
        },
        removeSale(state, action) {
            
            state.sales = state.sales.filter(sale => sale.id !== action.payload);
        },
    },
});

// Export actions
export const { setSales, addSale, removeSale } = saleSlice.actions;

// Export the reducer
export default saleSlice.reducer;