const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subcategory = require('../models/Subcategory');
const localDB = require('../utils/localDB');

const isConnected = () => mongoose.connection.readyState === 1;

// Get all subcategories
router.get('/', async (req, res) => {
    try {
        if (!isConnected()) {
            return res.json(localDB.getAll('subcategories'));
        }
        const subcategories = await Subcategory.find({});
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create subcategory
router.post('/', async (req, res) => {
    try {
        if (!isConnected()) {
            const newItem = localDB.insert('subcategories', req.body);
            return res.status(201).json(newItem);
        }
        const subcategory = new Subcategory(req.body);
        const createdSubcategory = await subcategory.save();
        res.status(201).json(createdSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update subcategory
router.put('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const updated = localDB.update('subcategories', req.params.id, req.body);
            return updated ? res.json(updated) : res.status(404).json({ message: 'Subcategory not found' });
        }
        const subcategory = await Subcategory.findById(req.params.id);
        if (subcategory) {
            Object.assign(subcategory, req.body);
            const updatedSubcategory = await subcategory.save();
            res.json(updatedSubcategory);
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete subcategory
router.delete('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            localDB.delete('subcategories', req.params.id);
            return res.json({ message: 'Subcategory removed' });
        }
        const subcategory = await Subcategory.findById(req.params.id);
        if (subcategory) {
            await subcategory.deleteOne();
            res.json({ message: 'Subcategory removed' });
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
