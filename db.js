const mongoose = require('mongoose');
const User = require('./models/User');
const Salle = require('./models/Salle');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/reunion');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Supprimez la base de données 'reunion'
        await mongoose.connection.db.dropDatabase();
        console.log('Database "reunion" deleted successfully.');

        // Données pour la collection 'Utilisateur'
        const utilisateursData = [
            {
                nom: 'dupont',
                prenom: 'jean',
                email: 'jean.dupont@example.com',
                password: 'password123'
            },
            {
                nom: 'marie',
                prenom: 'durant',
                email: 'marie.durand@example.com',
                password: 'password456'
            }
        ];

        User.insertMany(utilisateursData)
            .then(() => console.log('Données Utilisateurs ajoutés avec succès'))
            .catch(err => console.error('Erreur lors de l\'ajout des utilisateurs', err));

        // Données pour la collection 'Salle'
        const sallesData = [
            {
                // id_salle: "A89",
                nom: 'Salle A',
                capacite: 10
            },
            {
                // id_salle: "B42",
                nom: 'Salle B',
                capacite: 20
            }
        ];

        Salle.insertMany(sallesData)
            .then(() => console.log('Données Salles ajoutés avec succès'))
            .catch(err => console.error('Erreur lors de l\'ajout des salles', err));
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Arrêt du processus en cas d'échec de la connexion
    }
};

module.exports = connectDB;