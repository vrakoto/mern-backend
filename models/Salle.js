const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    capacite: { type: Number, required: true }
});

const Salle  = mongoose.model('salle', salleSchema);

// Données pour la collection 'Salle'
const sallesData = [
	{
		nom: 'Salle A',
		capacite: 10
	},
	{
		nom: 'Salle B',
		capacite: 20
	}
];

Salle.insertMany(sallesData)
    .then(() => console.log('Données Salles ajoutés avec succès'))
    .catch(err => console.error('Erreur lors de l\'ajout des salles', err));
module.exports = Salle;
