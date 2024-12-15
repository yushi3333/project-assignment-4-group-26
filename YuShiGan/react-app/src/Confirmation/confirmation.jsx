import React,  { useEffect,useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './confirmation.css'
import axios from 'axios';
import { clearCart } from '../Cart/CartSlice'; 

const confirmation = () =>{
    const dispatch = useDispatch(); // Initialize the dispatch function
    const cart = useSelector(state => state.cart.items);
    const navigator = useNavigate();
    console.log("Cart items:", cart);
    const TAX_RATE = 0.13; 
    const DELIVERY_COST = 50.00; 
    const [isStockUpdated, setIsStockUpdated] = useState(false);
    const [hasUpdatedStock, setHasUpdatedStock] = useState(false);


    const calculateSubTotal = () =>{
        
        // Ensure cart is not empty or undefined
        if (!cart || cart.length === 0) return "0.00";
        return cart.reduce((totalCost, item) => totalCost + (item.price * item.quantity), 0);
    };
    // Calculate tax amount
    const calculateTax = (subtotal) => {
        return subtotal * TAX_RATE;
    };

    const calculateTotalAmount = () =>{
        const subtotal = calculateSubTotal();
        const tax = calculateTax(subtotal);
        
        return (subtotal + tax + DELIVERY_COST).toFixed(2);

    }
    // Update product stock in backend after confirming purchase
    const updateProductStock = async () => {
        try {
            console.log("Updating product stock...");
            setIsStockUpdated(true); 
            await Promise.all(
                cart.map(async (item) => {   
                    console.log("the updating product id: ", item._id)
                    await axios.put(`http://localhost:3002/api/products/${item._id}/update-stock`, {
                    quantityBought: item.quantity,
                });
                
                })
            );
          
          console.log('Product stock updated successfully.');
        } catch (error) {
          console.error('Error updating product stock:', error.response?.data || error.message);
        }
    };
      

    // UseEffect to update stock once the confirmation page is rendered
    useEffect(() => {
        if (cart && cart.length > 0 && !hasUpdatedStock) {
            console.log("Updating stock, cart length:", cart.length);
            updateProductStock();
            setHasUpdatedStock(true);
        
        
        }
    }, [cart, hasUpdatedStock]);



    const handleBackHome=() =>{
        if (isStockUpdated) {
            dispatch(clearCart());
        }
        
        navigator("/home")

    }

    return (
        
        <div className = "confirmation-order">
            <h2>Order Confirmation</h2>
            <p>Thanks for your purchase! Here is your order summary</p>
            <div className ="order-summary">
                {cart.map(item=>(
                    <div key={item.name} className="order-item">
                        <img src={item.image} className='order-image'/>
                        <p>{item.name}(Quantity:{item.quantity}) - ${item.price}</p>
                        
                    </div>
                ))
                }
                <h3>Total Amount Paid: ${calculateTotalAmount()}</h3>
                <button onClick={handleBackHome}>Back to Home</button>


            </div>

        </div>
    )
}

export default confirmation;