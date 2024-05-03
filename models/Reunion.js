const mongoose = require('mongoose');

const reunionSchema = new mongoose.Schema({
    duree: { type: Number, required: true },
    motif: { type: String, required: true },
    id_salle: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'salle' }
});

const Reunion = mongoose.model('reunion', reunionSchema);
module.exports = Reunion;