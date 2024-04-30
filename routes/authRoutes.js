const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assurez-vous que le chemin est correct

const router = express.Router();

// Route d'inscription
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12); // Hachage du mot de passe

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save(); // Sauvegarde du nouvel utilisateur dans la base de données

        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Vérification du mot de passe

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Génération du token JWT

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
