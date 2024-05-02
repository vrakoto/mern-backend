const mongoose = require('mongoose');

const reunionUserSchema = new mongoose.Schema({
	id_utilisateur: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    id_reunion: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'reunion' }
});

const ReunionUsers = mongoose.model('reunion_user', reunionUserSchema);

// Données pour la collection 'Reunion_User'
const reunion_usersData = [
	{
		id_utilisateur: 'jean.dupont@example.com',
		id_reunion: 'brainstorming_equipeA'
	},
	{
		id_utilisateur: 'marie.durand@example.com',
		id_reunion: 'agile_equipeB'
	}
];


// ReunionUsers.insertMany(reunion_usersData)
//     .then(() => console.log('Données Réunions utilisateurs avec succès'))
//     .catch(err => console.error('Erreur lors de l\'ajout des réunions utilisateurs', err));

module.exports = ReunionUsers;