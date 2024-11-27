import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../Cart/CartSlice';
import CartItem from '../Cart/CartItem';
import '../Home/productList.css';
import axios from 'axios';
import logo from '../../img/log.png';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [Products, setProducts] = useState([]);
    const [reviews, setReviews] = useState({});
    const [loadingReviews, setLoadingReviews] = useState({});
    const [reviewError, setReviewError] = useState({});
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get cart items from Redux store
    const cart = useSelector((state) => state.cart.items);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/products');
                const data = await response.data;
                setProducts(data);
                console.log('Fetched products:', data);
            } catch (error) {
                console.log('Error fetching all products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleLogOut = () => {
        navigate("/");
    };

    const handleReviewClick = async (product) => {
        const { productUrl, _id } = product;
        console.log("Product URL:", productUrl);

        setLoadingReviews((prevLoading) => ({
            ...prevLoading,
            [_id]: true,
        }));

        try {
            const response = await axios.post('http://localhost:3002/api/reviews/get-reviews', {
                productUrl,
            });

            if (response.data.success) {
                console.log("The rating data: ", response.data);
                setReviews((prevReviews) => ({
                    ...prevReviews,
                    [_id]: response.data,
                }));
            } else {
                setReviewError((prevError) => ({
                    ...prevError,
                    [_id]: true,
                }));
            }
        } catch (err) {
            setReviewError((prevError) => ({
                ...prevError,
                [_id]: true,
            }));
        } finally {
            setLoadingReviews((prevLoading) => ({
                ...prevLoading,
                [_id]: false,
            }));
        }
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
        setProducts((prevProducts) =>
            prevProducts.map((p) =>
                p._id === product._id ? { ...p, stock: p.stock - 1 } : p
            )
        );
    };

    const styleObj={
        position: 'fixed', // navbar at the top
        top: 0, // Position it at the very top
        left: 0,
        right: 0,
        zIndex: 1000, // Makes sure it stays above other elements
        backgroundColor: '#FA8072',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const calculateTotalItemQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Filter products based on search term
    const filteredProducts = searchTerm
        ? Products.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : Products; // Show all products if no search term

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src={logo} alt="" />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Computer Store</h3>
                                <i style={{ color: 'white' }}>Everything is in my pocket</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
                    />
                    <div>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <h2 className="cart">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                    id="IconChangeColor"
                                    height="68"
                                    width="68"
                                >
                                    <rect width="156" height="156" fill="none"></rect>
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none"
                                        stroke="#faf9f9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        id="mainIconPathAttribute"
                                    ></path>
                                </svg>
                                <div className="cart_quantity_count">
                                    {calculateTotalItemQuantity()}
                                </div>
                            </h2>
                        </a>
                    </div>
                </div>
            </div>

            {/* Conditional rendering for Cart or Product List */}
            {showCart ? (
                <CartItem onContinueShopping={handleContinueShopping} />
            ) : Products.length > 0 ? (
                <div className="product-grid">
                    {['Lenovo laptop', 'Dell laptop'].map((category) => {
                        // Filter category products based on searchTerm
                        const categoryProducts = filteredProducts.filter(
                            (product) => product.category === category
                        );
                        if (categoryProducts.length > 0) {
                            return (
                                <div key={category}>
                                    <h2 className="product-category">{category}</h2>
                                    <div className="product-list">
                                        {categoryProducts.map((product, index) => (
                                            <div className="product-card" key={index}>
                                                <img
                                                    className="product-image"
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                                <div className="product-title">{product.name}</div>
                                                <div className="product-description">
                                                    {product.description}
                                                </div>
                                                <div className="product-price">${product.price}</div>
                                                <button
                                                    className={
                                                        product.stock === 0
                                                            ? 'disabled-button'
                                                            : 'product-button'
                                                    }
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={product.stock === 0}
                                                >
                                                    {product.stock > 0
                                                        ? 'Add to Cart'
                                                        : 'Out of Stock'}
                                                </button>
                                                <button
                                                    className="review-button"
                                                    onClick={() => handleReviewClick(product)}
                                                >
                                                    Review
                                                </button>
                                                {loadingReviews[product._id] && (
                                                    <p>Loading reviews...</p>
                                                )}

                                                {reviewError[product._id] && (
                                                    <p style={{ color: 'red' }}>
                                                        Error: Failed to load reviews.
                                                    </p>
                                                )}

                                                {/* Rendering reviews for this product */}
                                                {reviews[product._id] && (
                                                    <div className="reviews-section">
                                                        <h3>Product Reviews</h3>
                                                        <p>Rating: {reviews[product._id].rating}</p>
                                                        <p>Review Count: {reviews[product._id].count}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            ) : (
                <p>Loading products...</p>
            )}
        </div>
    );
};

export default Home;
