const express = require('express');
const Salle = require('../models/Salle');

const router = express.Router();

router.get('/salles', async (req, res) => {
    try {
        const salles = await Salle.find()
        res.status(200).json(salles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/supprimer/:id_salle', async (req, res) => {
    try {
        const id_salle = req.params.id_salle;

        const salleDeleted = await Salle.findByIdAndDelete({_id: id_salle});
        if (!salleDeleted) {
            return res.status(404).json({ message: 'Salle non trouvée' });
        }

        res.status(201).json({ message: "Salle supprimée !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;