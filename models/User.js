const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Méthode pour hacher le mot de passe avant de sauvegarder l'utilisateur
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// });

const User = mongoose.model('users', userSchema);

module.exports = User;