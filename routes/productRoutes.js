const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const localDB = require('../utils/localDB');

const isConnected = () => mongoose.connection.readyState === 1;

// Get all products
router.get('/', async (req, res) => {
    try {
        if (!isConnected()) {
            return res.json(localDB.getAll('products'));
        }
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products by category
router.get('/category/:categoryName', async (req, res) => {
    try {
        const { categoryName } = req.params;
        const normalized = categoryName.toLowerCase().replace(/-/g, ' ');
        if (!isConnected()) {
            const products = localDB.getAll('products');
            const filtered = products.filter(p => p.category && p.category.toLowerCase().replace(/-/g, ' ') === normalized);
            return res.json(filtered);
        }
        // Case-insensitive regex match for category that treats spaces and dashes interchangeably
        const regexStr = `^${categoryName.replace(/-/g, '[- ]')}$`;
        const products = await Product.find({
            category: { $regex: new RegExp(regexStr, 'i') }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products by subcategory
router.get('/subcategory/:subcategoryName', async (req, res) => {
    try {
        const { subcategoryName } = req.params;
        const normalized = subcategoryName.toLowerCase().replace(/-/g, ' ');
        if (!isConnected()) {
            const products = localDB.getAll('products');
            const filtered = products.filter(p => p.subcategory && p.subcategory.toLowerCase().replace(/-/g, ' ') === normalized);
            return res.json(filtered);
        }
        // Case-insensitive regex match for subcategory that treats spaces and dashes interchangeably
        const regexStr = `^${subcategoryName.replace(/-/g, '[- ]')}$`;
        const products = await Product.find({
            subcategory: { $regex: new RegExp(regexStr, 'i') }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        if (!isConnected()) {
            const products = localDB.getAll('products');
            const product = products.find(p => p.slug === req.params.slug);
            return product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
        }
        const product = await Product.findOne({ slug: req.params.slug });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const product = localDB.getById('products', req.params.id);
            return product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create product
router.post('/', async (req, res) => {
    try {
        if (!isConnected()) {
            const newItem = localDB.insert('products', req.body);
            return res.status(201).json(newItem);
        }
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const updated = localDB.update('products', req.params.id, req.body);
            return updated ? res.json(updated) : res.status(404).json({ message: 'Product not found' });
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            Object.assign(product, req.body);
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            localDB.delete('products', req.params.id);
            return res.json({ message: 'Product removed' });
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
