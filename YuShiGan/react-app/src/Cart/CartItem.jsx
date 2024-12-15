import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../Cart/CartSlice';
import { useNavigate } from 'react-router-dom';
import '../Cart/CartItem.css';

const CartItem = ({ onContinueShopping, products, setProducts }) => {
  const cart = useSelector((state) => state.cart.items);
  console.log(cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total amount for all products in the cart
  // Constants for delivery and tax
  const DELIVERY_COST = 50; // Fixed delivery fee
  const TAX_RATE = 0.08; // 8% tax rate

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalCartAmount = cart.reduce((totalCost, item) => totalCost + item.price * item.quantity, 0);
    const taxAmount = totalCartAmount * TAX_RATE;
    return totalCartAmount + taxAmount + DELIVERY_COST;
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleIncrement = (item) => {
   
    if (item.quantity < item.stock) {
      // Increase quantity in cart
      dispatch(updateQuantity({ _id: item._id, name: item.name, quantity: item.quantity + 1 }));

      // Decrease stock in product list
      setProducts((prevProducts) =>
          prevProducts.map((product) =>
              product._id === item._id ? { ...product, stock: product.stock - 1 } : product
          )
      );
  }

   
   
  };

  const handleDecrement = (item) => {
    if (!item._id) {
      console.error('Error: item._id is undefined', item);
      return;
    }
    
    if (item.quantity > 1) {
      // Decrease quantity in cart
      dispatch(updateQuantity({_id: item._id, name: item.name, quantity: item.quantity - 1 }));

      // Increase stock in product list
    
      setProducts((prevProducts) => {
        if (Array.isArray(prevProducts)) {
            return prevProducts.map((product) =>
                product._id === item._id ? { ...product, stock: product.stock + 1 } : product
            );
        } else {
            console.error('prevProducts is not an array', prevProducts);
            return prevProducts;
        }
    });
             
    }
  };

  const handleRemove = (item) => {
    // Increase stock based on removed quantity
    if (!item._id) {
      console.error('Error: item._id is undefined', item);
      return;
    }
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === item._id ? { ...product, stock: product.stock + item.quantity } : product
      )
    );

    dispatch(removeItem(item._id));
  };

  const handleCheckoutShopping = () => {
    navigate('/payment');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.price) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black', marginTop:'20%'}}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item._id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.price}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="summary-container" style={{ marginTop: '20px', color: 'black' }}>
        <h3>Summary</h3>
        <p>Subtotal: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        <p>Tax (13%): ${(cart.reduce((total, item) => total + item.price * item.quantity, 0) * TAX_RATE).toFixed(2)}</p>
        <p>Delivery Cost: ${DELIVERY_COST.toFixed(2)}</p>
        <p><strong>Total Amount: ${calculateTotalAmount().toFixed(2)}</strong></p>
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button2" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className={
          cart.length <= 0 ? 'get-started-button1' : "get-started-button2"

        }
        
         onClick={handleCheckoutShopping} 
         disabled={cart.length===0}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
