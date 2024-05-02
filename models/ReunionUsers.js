const mongoose = require('mongoose');

const reunionUserSchema = new mongoose.Schema({
    dateHeure: Date,
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    reunion: { type: mongoose.Schema.Types.ObjectId, ref: 'reunion' }
});

const ReunionUsers = mongoose.model('reunion_user', reunionUserSchema);

// Données pour la collection 'Reunion_User'
const reunion_usersData = [
	{
		_id_utilisateur: '1',
		_id_reunion: 'sA'
	},
	{
		_id_utilisateur: '2',
		_id_reunion: 'sB'
	}
];


ReunionUsers.insertMany(reunion_usersData)
    .then(() => console.log('Données Réunions utilisateurs avec succès'))
    .catch(err => console.error('Erreur lors de l\'ajout des réunions utilisateurs', err));

module.exports = ReunionUsers;