const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    capacite: { type: Number, required: true }
});

const Salle  = mongoose.model('salle', salleSchema);

module.exports = Salle;