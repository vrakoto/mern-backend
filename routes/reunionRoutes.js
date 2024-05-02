const express = require('express');
const Reunion = require('../models/Reunion');

const router = express.Router();

router.get('/reunions', async (req, res) => {
    try {
        console.log(req);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;