import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../src/Cart/CartSlice';

 const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
export default store