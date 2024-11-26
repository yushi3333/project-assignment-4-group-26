import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    image:''
  });

  // When the product prop changes, populate the form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image:product.image
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        image: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price:parseFloat(formData.price),
      stock:parseInt(formData.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock Quantity"
        required
      />
      <input
      type = "text"
      name = "image"
      value = {formData.image}
      onChange = {handleChange}
      placeholder="image url"
      />
      <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;
