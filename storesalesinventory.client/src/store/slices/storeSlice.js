import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'stores',
    initialState: {
        stores: [],
    },
    reducers: {
        setStores(state, action) {
            state.stores = action.payload;
        },
        addStore(state, action) {
            state.stores.push(action.payload);
        },
        removeStore(state, action) {
            state.stores = state.stores.filter(store => store.id !== action.payload);
        },
    },
});

// Export actions
export const { setStores, addStore, removeStore } = storeSlice.actions;

// Export the reducer
export default storeSlice.reducer;