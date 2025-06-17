const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    type: String,
    intensity: {
        type: String,
        enum: ['niska', 'średnia', 'wysoka'],
    },
    duration: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workout', workoutSchema);