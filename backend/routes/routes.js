const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Import the Item model from your schema file
const Item = require('../models/Item.js');

// Manual input validation
function validateItem(data) {
    if (!data.name || typeof data.name !== 'string') {
        return 'Name is required and must be a string';
    }
    if (data.description && typeof data.description !== 'string') {
        return 'Description must be a string';
    }
    return null;
}

// Create a new item (POST)
router.post('/items', async (req, res) => {
    const validationError = validateItem(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all items (GET)
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a specific item by ID (GET)
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update an item by ID (PUT)
router.put('/items/:id', async (req, res) => {
    const validationError = validateItem(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete an item by ID (DELETE)
router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
