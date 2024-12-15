import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './productForm';
import './dashBoard.css'; 

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submission (create or update a product)
  const handleFormSubmit = async (product) => {
    if (editingProduct) {
      // Update product
      try {
        console.log('Updating product with ID:', editingProduct._id);
        await axios.put(`http://localhost:3002/api/products/${editingProduct._id}`, product);
        console.log('Product updated successfully!');
        window.location.reload();  // Force the page to reload to reflect the changes
        
      } catch (error) {
        console.error('Failed to update product', error);
      }
    } else {
      // Create new product
      try {
        const response = await axios.post('http://localhost:3002/api/products', product);

        setProducts([...products, response.data]);
        
        window.location.reload(); 
      } catch (error) {
        console.error('Failed to create product', error);
      }
    }
  };

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      fetchProducts(); 
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="product-form">
        <ProductForm
          key={editingProduct ? editingProduct._id : 'new'}
          product={editingProduct}
          onSubmit={handleFormSubmit}
        />
      </div>

      <div className="product-list">
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
