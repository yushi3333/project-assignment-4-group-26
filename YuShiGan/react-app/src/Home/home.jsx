import {useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../Cart/CartSlice';
import CartItem from '../Cart/CartItem';
import '../Home/productList.css'

//import the images
import laptop from '../../img/lenvo-1.avif';
import laptop2 from '../../img/lenvo-2.1.avif';
import laptop3 from '../../img/lenvo-3.1.avif';
import dell1 from '../../img/dell-1.1.avif';
import dell2 from '../../img/dell-1.2.avif';
import dell3 from '../../img/dell-1.3.avif';
import logo from '../../img/log.png';
const elecArray = [
    {
        category: "Lenvo laptop",
        electrons:[
            {
                name:"Legion 7i Gen 9 (16″ Intel) Gaming Laptop",
                image: laptop,
                description:"Processor: 14th Generation Intel® Core™ i7-14700HX Processor (E-Core Max 3.90 GHz, P-Core Max 5.50 GHz with Turbo Boost, 20 Cores, 28 Threads, 33 MB Cache)",
                cost:2099.99

            },
            {
                name:"Yoga Slim 7i Aura Edition (15″ Intel) Laptop",
                image:laptop2,
                description:"Processor: Intel® Core™ Ultra 7 256V Processor (E-cores up to 3.70 GHz P-cores up to 4.80 GHz with Turbo Boost, 8 Cores, 8 Threads, 12 MB Cache)",
                cost:1699.99

            },
            {
                name:"ThinkPad C14 Chromebook Enterprise (14” Intel) Laptop",
                image:laptop3,
                description:"Processor: 12th Generation Intel® Core™ i3-1215U Processor (E-Core Max 3.30 GHz, P-Core Max 4.40 GHz with Turbo Boost, 6 Cores, 8 Threads, 10 MB Cache)",
                cost:537.1

            }

        ]

    },
    {
        category:"Dell Laptop",
        electrons:[
            {
                name:"G15 Gaming Laptop",
                image: dell1,
                description:"Processor: 13th Gen Intel® Core™ i7-13650HX (24 MB cache, 14 cores, 20 threads, up to 4.90 GHz Turbo)",
                cost:1599.99
            },
            {
                name:"Precision 3591 Workstation",
                image: dell2,
                description:"Processor: Intel® Core™ Ultra 9 185H vPro® Enterprise (24 MB cache, 16 cores, 22 threads, up to 5.1 GHz, 45W)",
                cost:3589.00
            },
            {
                name:"Chromebook 3110 Laptop",
                image: dell3,
                description:"Processor: Intel® Celeron™ N4500 (Dual Core, up to 2.8GHz, 4M Cache, 6W), 4GB Memory, 64GB Storage",
                cost:586.61
            },
        ]
    }
    

]

const Home = ()=>{
    const navigate = useNavigate();
    const handleLogOut=()=>{
        navigate("/")
    }

    const [showCart, setShowCart] = useState(false); 
    const [addedToCart, setAddedToCart] = useState({});
  
    // Get cart items from Redux store
    const cart = useSelector(state => state.cart.items);
    
    
    // Calculate the total quantity of items in the cart
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);


    
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
           ...prevState,
           [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
         }));
    };

    const styleObj={
        backgroundColor: '#FA8072',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
       }
       const styleObjUl={
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
       }
       const styleA={
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
       }
       const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
        {/*
        setShowGrocery(false);
        setShowPlants(false);
       */}
        };
        
        const calculateTotalItemQuantity = () => {
            const items = cart.map((item) => item.quantity);
            return items.reduce((total, quantity) => total + quantity, 0)
        }
        const handleContinueShopping = (e) => {
            e.preventDefault();
            setShowCart(false);
            
            
          };
    

    return(
        <div> 

            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src={logo} alt="" />
                        <a href="/" style={{textDecoration:'none'}}>
                                <div>
                                    <h3 style={{color:'white'}}>Computer Store</h3>
                                    <i style={{color:'white'}}>Everything is in my pocket</i>
                                </div>
                        </a>
                    </div>              
                </div>
                <div style={styleObjUl}>
                    {/*
                    <div> <a href="#" onClick={(e)=>handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> <a href="#" onClick={(e)=>handleGroceryClick(e)} style={styleA}>Groceries</a></div>
                    <div> <a href="#" onClick={(e)=>handleElectClick(e)} style={styleA}>Electroncies</a></div>
                    <div><SearchBar onSearch={handleSearch }/></div>
    */}
                    <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <h1 className='cart'>
                            <svg xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 256 256" 
                            id="IconChangeColor" 
                            height="68" width="68"
                            >
                            <rect width="156" height="156" fill="none"></rect>    
                            <circle cx="80" cy="216" r="12"></circle>
                            <circle cx="184" cy="216" r="12"></circle>
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" id="mainIconPathAttribute"></path>
                            </svg>
                            <h1 className='cart_quantity_count'>
                                {calculateTotalItemQuantity()}
                            </h1>

                         </h1>                
                    </a></div>

                </div>
            </div>

            {/* Conditional rendering for Cart or Product List */}
            {showCart ? (
                <CartItem onContinueShopping={handleContinueShopping} />
            ) : (
                <div className="product-grid">
                    {elecArray.map((category, index) => (
                        <div key={index}>
                            <h1>{category.category}</h1>
                            <div className="product-list">
                                {category.electrons.map((electron, index) => (
                                    <div className="product-card" key={index}>
                                        <img className="product-image" src={electron.image} alt={electron.name} />
                                        <div className="product-title">{electron.name}</div>
                                        <div className="product-description">{electron.description}</div>
                                        <div className="product-price">${electron.cost}</div>
                                        <button className="product-button" onClick={() => handleAddToCart(electron)}>Add To Cart</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}              
        </div>
          
    );


}

export default Home;