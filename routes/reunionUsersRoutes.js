const express = require('express');
const ReunionUsers = require('../models/ReunionUsers');

const router = express.Router();

router.get('/reunions_users', async (req, res) => {
    try {
        console.log(req);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;