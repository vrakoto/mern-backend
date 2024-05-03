const express = require('express');
const Reunion = require('../models/Reunion');

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
        const sesReunions = await Reunion.find({id_utilisateur});
        res.status(200).json(sesReunions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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