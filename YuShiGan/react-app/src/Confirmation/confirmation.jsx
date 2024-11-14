import React from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './confirmation.css'

const confirmation = () =>{
    const cart = useSelector(state => state.cart.items);
    const navigator = useNavigate();
    console.log("Cart items:", cart);

    const calculateTotalAmount = () =>{
        
        // Ensure cart is not empty or undefined
        if (!cart || cart.length === 0) return "0.00";
        return cart.reduce((totalCost, item) => totalCost + (item.cost * item.quantity), 0).toFixed(2);
    };

    const handleBackHome=() =>{
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
                        <p>{item.name}(Quantity:{item.quantity}) - ${item.cost.toFixed(2)}</p>
                        
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