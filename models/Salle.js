const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
	// id_salle: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    capacite: { type: Number, required: true }
});

const Salle  = mongoose.model('salle', salleSchema);

module.exports = Salle;