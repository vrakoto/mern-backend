const express = require('express');
const Reunion = require('../models/Reunion');
const ReunionUsers = require('../models/ReunionUsers');
const User = require('../models/User');

const router = express.Router();


// Créer une réunion
router.post('/creer', async (req, res) => {
    try {
        const { duree, motif, id_salle } = req.body;

        const newReunion = new Reunion({
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


// Récupérer toutes les réunions
router.get('/reunions', async (req, res) => {
    try {
        const reunions = await Reunion.find();
        res.status(200).json(reunions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Récupérer toutes les réunions d'un utilisateur
router.get('/utilisateur_reunions/:id_utilisateur', async (req, res) => {
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


// Supprimer une réunion
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