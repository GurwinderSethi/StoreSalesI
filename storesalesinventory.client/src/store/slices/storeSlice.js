import { createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'stores',
    initialState: {
        stores: [],
    },
    reducers: {
        setStores(state, action) {
            console.log('Setting stores:', action.payload);
            state.stores = action.payload;
            console.log('state.stores =', state.stores);
        },
        addStore(state, action) {
            console.log('Adding store:', action.payload);
            state.stores.push(action.payload);
        },
        removeStore(state, action) {
            console.log('Removing store:', action.payload);
            state.stores = state.stores.filter(store => store.id !== action.payload);
        },
    },
});

// Export actions
export const { setStores, addStore, removeStore } = storeSlice.actions;

// Export the reducer
export default storeSlice.reducer;