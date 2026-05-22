const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const localDB = require('../utils/localDB');

// Helper to check if DB is connected
const isConnected = () => mongoose.connection.readyState === 1;

// Get all categories
router.get('/', async (req, res) => {
    try {
        if (!isConnected()) {
            return res.json(localDB.getAll('categories'));
        }
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single category by ID
router.get('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const cat = localDB.getById('categories', req.params.id);
            return cat ? res.json(cat) : res.status(404).json({ message: 'Category not found' });
        }
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create category
router.post('/', async (req, res) => {
    try {
        if (!isConnected()) {
            const newCat = localDB.insert('categories', req.body);
            return res.status(201).json(newCat);
        }
        const category = new Category(req.body);
        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update category
router.put('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const updated = localDB.update('categories', req.params.id, req.body);
            return updated ? res.json(updated) : res.status(404).json({ message: 'Category not found' });
        }
        const category = await Category.findById(req.params.id);
        if (category) {
            Object.assign(category, req.body);
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete category
router.delete('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            localDB.delete('categories', req.params.id);
            return res.json({ message: 'Category removed' });
        }
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.deleteOne();
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
