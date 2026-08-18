import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
            
        },
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
    },
});

// Export actions
export const { setProducts, addProduct, removeProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;