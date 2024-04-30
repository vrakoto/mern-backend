// Données pour la collection 'Utilisateur'
const utilisateursData = [
	{
		username: 'jdupont',
		email: 'jean.dupont@example.com',
		password: 'password123'
	},
	{
		username: 'mdurand',
		email: 'marie.durand@example.com',
		password: 'password456'
	}
];

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

// Données pour la collection 'Reunion'
const reunionsData = [
	{
		motif: 'Réunion annuelle',
		dateHeure: new Date(2024, 4, 20, 14, 30)
	},
	{
		motif: 'Réunion de projet',
		dateHeure: new Date(2024, 4, 22, 9, 0)
	}
];

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

module.exports = {
	utilisateursData,
	sallesData,
	reunionsData,
	reunion_usersData
};