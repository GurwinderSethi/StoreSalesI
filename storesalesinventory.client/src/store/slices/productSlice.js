import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts(state, action) {
            console.log('Setting products:', action.payload);
            state.products = action.payload;
            console.log('state.products =', state.products);
        },
        addProduct(state, action) {
            console.log('Adding product:', action.payload);
            state.products.push(action.payload);
        },
        removeProduct(state, action) {
            console.log('Removing product:', action.payload);
            state.products = state.products.filter(product => product.id !== action.payload);
        },
    },
});

// Export actions
export const { setProducts, addProduct, removeProduct } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;