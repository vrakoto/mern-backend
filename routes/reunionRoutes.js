const express = require('express');
const Reunion = require('../models/Reunion');
const ReunionUsers = require('../models/ReunionUsers');
const User = require('../models/User');

const router = express.Router();


// Créer une réunion : http://localhost:3001/reunion/creer
router.post('/creer', async (req, res) => {
    try {
        const { dateHeure, duree, motif, id_salle } = req.body;

        const newReunion = new Reunion({
            dateHeure,
            duree,
            motif,
            id_salle
        });

        await newReunion.save();

        res.status(201).json({ 
            message: 'Reunion created successfully!',
            id_reunion: newReunion._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Récupérer toutes les réunions : http://localhost:3001/reunion/all
router.get('/all', async (req, res) => {
    try {
        const reunions = await Reunion.find();
        res.status(200).json(reunions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Récupérer toutes les réunions d'un utilisateur : http://localhost:3001/reunion/user/:id_utilisateur
router.get('/user/:id_utilisateur', async (req, res) => {
    const id_utilisateur = req.params.id_utilisateur;
    try {
        // Rechercher l'utilisateur par son ID
        const user = await User.findById(id_utilisateur);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur inexistant' });
        }

        // Rechercher toutes les associations ReunionUsers pour cet utilisateur
        const reunionUsers = await ReunionUsers.find({ id_utilisateur: user._id }).populate('id_reunion');

        // Extraire les réunions des associations ReunionUsers
        const sesReunions = reunionUsers.map(reunionUser => reunionUser.id_reunion);

        res.status(200).json(sesReunions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Supprimer une réunion : http://localhost:3001/reunion/supprimer/:id_reunion
router.delete('/supprimer/:id_reunion', async (req, res) => {
    try {
        const id_reunion = req.params.id_reunion;

        const reunionDeleted = await Reunion.findByIdAndDelete({_id: id_reunion});
        if (!reunionDeleted) {
            return res.status(404).json({ message: 'Réunion non trouvé' });
        }

        res.status(201).json({ message: "Réunion supprimé !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;