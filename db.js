const mongoose = require('mongoose');
const { utilisateursData, sallesData, reunionsData, reunion_usersData } = require('./donnees');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Supprimez la base de données 'reunion'
        await mongoose.connection.db.dropDatabase();
        console.log('Database "reunion" deleted successfully.');

        const userSchema = new mongoose.Schema({
            username: String,
            email: String,
            password: String
        });
        const User  = mongoose.model('utilisateur', userSchema);

        const salleSchema = new mongoose.Schema({
            nom: String,
            capacite: Number
        });
        const Salle  = mongoose.model('salle', salleSchema);

        const reunionSchema = new mongoose.Schema({
            duree: Number,
            motif: String,
            id_salle: { type: mongoose.Schema.Types.ObjectId, ref: 'salle' },
        });
        const Reunion  = mongoose.model('reunion', reunionSchema);

        const reunionUserSchema = new mongoose.Schema({
            dateHeure: Date,
            utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur' },
            reunion: { type: mongoose.Schema.Types.ObjectId, ref: 'reunion' }
        });
        const Reunion_Users  = mongoose.model('reunion_users', reunionUserSchema);

        User.insertMany(utilisateursData)
            .then(() => console.log('Données Utilisateurs ajoutés avec succès'))
            .catch(err => console.error('Erreur lors de l\'ajout des utilisateurs', err));

        Salle.insertMany(sallesData)
            .then(() => console.log('Données Salles ajoutés avec succès'))
            .catch(err => console.error('Erreur lors de l\'ajout des salles', err));

        Reunion.insertMany(reunionsData)
            .then(() => console.log('Données Réunions ajoutés avec succès'))
            .catch(err => console.error('Erreur lors de l\'ajout des réunions', err));

        // Reunion_Users.insertMany(reunion_usersData)
        //     .then(() => console.log('Données Réunions utilisateurs avec succès'))
        //     .catch(err => console.error('Erreur lors de l\'ajout des réunions utilisateurs', err));

        // Exportation des modèles
        // module.exports = {
        //     User,
        //     Salle,
        //     Reunion,
        //     Reunion_Users
        // };
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Arrêt du processus en cas d'échec de la connexion
    }
};

module.exports = connectDB;
