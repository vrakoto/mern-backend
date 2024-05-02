const express = require('express');
const Salle = require('../models/Salle');

const router = express.Router();

router.get('/salles', async (req, res) => {
    try {
        console.log(req);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;