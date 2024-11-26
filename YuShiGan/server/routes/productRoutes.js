const express = require('express');
const {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    getProductsById
} = require('../controllers/productController');

const router = express.Router();

//CRUD routes for products
router.get('/', getProducts);
router.get('/:id', getProductsById);
router.post('/', createProducts);//create
router.put('/:id', updateProducts);//update
router.delete('/:id', deleteProducts)

module.exports = router;

