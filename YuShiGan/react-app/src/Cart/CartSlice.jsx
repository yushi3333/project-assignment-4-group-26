import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
      localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
  }
};





export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(), // Load cart from localStorage on initialization
  },
  reducers: {
    addItem: (state, action) => {
      const {_id, name, image, price, stock} = action.payload;
      const existingItem = state.items.find(item => item._id === _id);
      if (existingItem){
         
         existingItem.quantity++;
        
        
      }else{
        state.items.push({_id, name, image, price, stock, quantity:1});
      }
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },
    updateQuantity: (state, action) => {
      const {_id, quantity} = action.payload;
      const itemToUpdate = state.items.find(item => item._id === _id);
      if (itemToUpdate && quantity <= itemToUpdate.stock){
        itemToUpdate.quantity = quantity;
        saveCartToLocalStorage(state.items); // Save updated cart to localStorage
      }else{
        console.log("updateQuantity can not add more than available stock")
      }  
    },
    clearCart: (state)=>{
      
      state.items = [];
      saveCartToLocalStorage(state.items);
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
