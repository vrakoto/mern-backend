const express = require('express');
const connectDB = require('./db'); // Importe la fonction de connexion à la base de données

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
connectDB();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Importe les routes d'authentification
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // Utilisation des routes d'authentification

// Route de base pour tester que le serveur fonctionne
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
