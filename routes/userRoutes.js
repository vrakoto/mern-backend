const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

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

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclure le champ 'password' pour des raisons de sécurité
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Récupérer les infos d'un utilisateur
router.get('/getUser/:id_utilisateur', async (req, res) => {
    const id_utilisateur = req.params.id_utilisateur;
    try {
        const users = await User.findOne({_id: id_utilisateur})
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Supprimer un utilisateur
router.delete('/supprimer/:id_utilisateur', async (req, res) => {
    const id_utilisateur = req.params.id_utilisateur;

    try {
        // Supprimer les associations de l'utilisateur dans 'Reunion_Utilisateur'
        // await ReunionUtilisateur.deleteMany({ id_Utilisateur: userId });

        // Supprimer l'utilisateur de 'Utilisateur'
        const userDeleted = await User.findByIdAndDelete({_id: id_utilisateur})

        if (!userDeleted) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route de connexion
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found!" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password); // Vérification du mot de passe

//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials!" });
//         }

//         const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Génération du token JWT

//         res.status(200).json({ token, userId: user._id });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;
