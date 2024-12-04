const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');

router.get('/', async (req, res) => {
    try {
        const wishes = await Wish.find().sort({ createdAt: -1 });
        res.render('index', { wishes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 
// Modified route to handle JSON and return JSON response
router.post('/wishes', async (req, res) => {
    try {
        const { name, message } = req.body;
        const newWish = new Wish({ name, message });
        await newWish.save();
        res.json({ success: true, wish: newWish });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

module.exports = router;