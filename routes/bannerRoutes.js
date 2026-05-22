const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Banner = require('../models/Banner');
const localDB = require('../utils/localDB');

const isConnected = () => mongoose.connection.readyState === 1;

// Get all banners
router.get('/', async (req, res) => {
    try {
        if (!isConnected()) {
            return res.json(localDB.getAll('banners'));
        }
        const banners = await Banner.find({}).sort({ createdAt: -1 });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single banner by ID
router.get('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const item = localDB.getById('banners', req.params.id);
            return item ? res.json(item) : res.status(404).json({ message: 'Banner not found' });
        }
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            res.json(banner);
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create banner
router.post('/', async (req, res) => {
    try {
        if (!isConnected()) {
            const newItem = localDB.insert('banners', req.body);
            return res.status(201).json(newItem);
        }
        const banner = new Banner(req.body);
        const createdBanner = await banner.save();
        res.status(201).json(createdBanner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update banner
router.put('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            const updated = localDB.update('banners', req.params.id, req.body);
            return updated ? res.json(updated) : res.status(404).json({ message: 'Banner not found' });
        }
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            Object.assign(banner, req.body);
            const updatedBanner = await banner.save();
            res.json(updatedBanner);
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete banner
router.delete('/:id', async (req, res) => {
    try {
        if (!isConnected()) {
            localDB.delete('banners', req.params.id);
            return res.json({ message: 'Banner removed' });
        }
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            await banner.deleteOne();
            res.json({ message: 'Banner removed' });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
