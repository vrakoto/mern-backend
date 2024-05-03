const express = require('express');
const ReunionUsers = require('../models/ReunionUsers');

const router = express.Router();


// Récupère toutes les réunions des utilisateurs : http://localhost:3001/reunion_user/all/
router.get('/all', async (req, res) => {
    try {
        const all = await ReunionUsers.find({});
        res.status(200).json(all);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Ajoute un utilisateur dans une réunion existante : http://localhost:3001/reunion_user/ajouter/
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


// Récupère tous les utilisateurs d'une réunion spécifique : http://localhost:3001/reunion_user/users/:id_reunion
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