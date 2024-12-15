import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./payment.css"
import { clearCart } from '../Cart/CartSlice'; 

const payment = () =>{
    const dispatch = useDispatch(); // Initialize the dispatch function
    const cart = useSelector(state => state.cart.items)
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const TAX_RATE = 0.13; 
    const DELIVERY_COST = 50.00; 
    const calculateSubTotal = () =>{
        
        // Ensure cart is not empty or undefined
        if (!cart || cart.length === 0) return "0.00";
        return cart.reduce((totalCost, item) => totalCost + (item.price * item.quantity), 0);
    };
    // Calculate tax amount
    const calculateTax = (subtotal) => {
        return subtotal * TAX_RATE;
    };


    //calculate the total amount for all products in the cart
    const calculateTotalAmount = () =>{
        const subtotal = calculateSubTotal();
        const tax = calculateTax(subtotal);
        return (subtotal + tax + DELIVERY_COST).toFixed(2);
    };
    const handlePayment = () =>{
        
        setIsProcessing(true);
        setTimeout(()=>{
            setIsProcessing(false)
            navigate('/confirmation')//navigate to the confimration page
            
        },4000)
    };
    return (
        <div className="payment-container">
            <h2>Payment details</h2>
            <p>Total Amount: ${calculateTotalAmount()}</p>

            <div className="payment-form">
                <input type="number" placeholder="Card Number" />
                <input type="text" placeholder="CardHolder Name" />
                <input type="date" placeholder="Expiration Date" />
                <input type="number" placeholder="CVV" />


            </div>
            <button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "Processing the payment..." : "Simulate payment"}

            </button>

        </div>
    )
}
export default payment;