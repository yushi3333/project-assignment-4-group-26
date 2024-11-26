import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./payment.css"

const payment = () =>{
    const cart = useSelector(state => state.cart.items)
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    //calculate the total amount for all products in the cart
    const calculateTotalAmount = () =>{
        return cart.reduce((totalCost, item) => totalCost + (item.price * item.quantity), 0).toFixed(2)
    };
    const handlePayment = () =>{
        setIsProcessing(true);
        setTimeout(()=>{
            setIsProcessing(false)
            navigate('/confirmation')//navigate to the confimration page
        },2000)
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