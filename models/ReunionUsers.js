const mongoose = require('mongoose');

const reunionUserSchema = new mongoose.Schema({
	id_utilisateur: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    id_reunion: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'reunion' }
});

const ReunionUsers = mongoose.model('reunion_user', reunionUserSchema);
module.exports = ReunionUsers;