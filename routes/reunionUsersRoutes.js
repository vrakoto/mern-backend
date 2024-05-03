const express = require('express');
const ReunionUsers = require('../models/ReunionUsers');

const router = express.Router();

// Ajoute un utilisateur dans une réunion existante
router.post('/ajouter', async (req, res) => {
    const { id_utilisateur, id_reunion } = req.body;

    try {
        const user = new ReunionUsers({
            id_utilisateur,
            id_reunion
        });

        await user.save();
        res.status(201).json({ message: "User was added successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupère tous les utilisateurs d'une réunion spécifique
router.get('/users/:id_reunion', async (req, res) => {
    const id_reunion = req.params.id_reunion;

    try {
        const users = await ReunionUsers.find({id_reunion})
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;