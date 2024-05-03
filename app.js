const cors = require('cors');
const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données, génération des collections et données bidons
connectDB();

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cors());

// Importe les routes d'authentification
const userRoutes = require('./routes/userRoutes');
const salleRoutes = require('./routes/salleRoutes');
const reunionRoutes = require('./routes/reunionRoutes');
const reunionUsersRoutes = require('./routes/reunionUsersRoutes');
app.use('/user', userRoutes);
app.use('/salle', salleRoutes);
app.use('/reunion', reunionRoutes);
app.use('/reunion_user', reunionUsersRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
