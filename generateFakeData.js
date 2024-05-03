const User = require('./models/User');
const Salle = require('./models/Salle');
const Reunion = require('./models/Reunion');
const ReunionUsers = require('./models/ReunionUsers');

const usersData = [
	{ nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', password: 'password123' },
	{ nom: 'Alvarez', prenom: 'Marie', email: 'marie.durand@example.com', password: 'password456' },
	{ nom: 'Haaland', prenom: 'Erling', email: 'erling.haaland@mancity.uk', password: 'mancity' },
	{ nom: 'Kylian', prenom: 'Mbappe', email: 'kylian.mbappe@psg.fr', password: 'psg' },
	{ nom: 'Vinicius', prenom: 'Junior', email: 'junior.vinicius@rmfc.spa', password: 'psg' },
];

const sallesData = [
	{ nom: 'Salle A', capacite: 10 },
	{ nom: 'Salle B', capacite: 20 },
	{ nom: 'Salle C', capacite: 80 },
	{ nom: 'Salle D', capacite: 5 },
];

const reunionsData = [
	{ motif: 'Réunion de projet', duree: 60 },
	{ motif: 'Point d\'avancement', duree: 30 },
	{ motif: 'Grooming', duree: 10 },
	{ motif: 'Brainstomring', duree: 80 },
];

async function generateFakeData() {
	try {
		// Supprimer les données existantes
		await User.deleteMany();
		await Salle.deleteMany();
		await Reunion.deleteMany();
		await ReunionUsers.deleteMany();

		// Insérer les nouvelles données
		const createdUsers = await User.insertMany(usersData);
		const createdSalles = await Salle.insertMany(sallesData);

		for (const reunionData of reunionsData) {
			const randomSalle = createdSalles[Math.floor(Math.random() * createdSalles.length)];
      
			// Générer une date aléatoire dans les 30 prochains jours
			const randomDate = new Date();
			randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30));
			
			const reunion = new Reunion({
				...reunionData,
				id_salle: randomSalle._id,
				dateHeure: randomDate // Ajouter la date aléatoire
			});
			const createdReunion = await reunion.save();

			const randomUsers = createdUsers.sort(() => 0.5 - Math.random()).slice(0, 3);
			const reunionUsersData = randomUsers.map((user) => ({
				id_utilisateur: user._id,
				id_reunion: createdReunion._id,
			}));
			await ReunionUsers.insertMany(reunionUsersData);
		}

		console.log('Données bidons générées avec succès');
	} catch (error) {
		console.error('Erreur lors de la génération des données bidons :', error);
	}
}

module.exports = generateFakeData;