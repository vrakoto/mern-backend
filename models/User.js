const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Méthode pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('users', userSchema);

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

User.insertMany(utilisateursData)
    .then(() => console.log('Données Utilisateurs ajoutés avec succès'))
    .catch(err => console.error('Erreur lors de l\'ajout des utilisateurs', err));
module.exports = User;
