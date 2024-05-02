const mongoose = require('mongoose');

const reunionSchema = new mongoose.Schema({
    duree: { type: Number, required: true },
    motif: { type: String, required: true },
    id_salle: { type: mongoose.Schema.Types.ObjectId, ref: 'salle' },
});

const Reunion = mongoose.model('reunion', reunionSchema);

// Données pour la collection 'Reunion'
const reunionsData = [
	{
		motif: 'Réunion annuelle',
		duree: 300
	},
	{
		motif: 'Réunion de projet',
		duree: 500
	}
];

Reunion.insertMany(reunionsData)
    .then(() => console.log('Données Réunions ajoutés avec succès'))
    .catch(err => console.error('Erreur lors de l\'ajout des réunions', err));

module.exports = Reunion;