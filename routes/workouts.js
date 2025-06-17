const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

router.get('/', async (req, res) => {
    const workouts = await Workout.find().sort({ date: -1 });
    res.render('index', { workouts });
});

router.get('/new', (req, res) => {
    res.render('form');
});

router.post('/new', async (req, res) => {
    const { type, intensity, duration } = req.body;
    await Workout.create({
        type,
        intensity,
        duration: parseInt(duration, 10),
    });
    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const workout = await Workout.findById(req.params.id);
    if (!workout) { 
        return res.status(404).send('Nie znaleziono treningu');
    }
    res.render('edit', { workout });
});

router.post('/edit/:id', async (req, res) => {
    const { type, intensity, duration } = req.body;
    await Workout.findByIdAndUpdate(req.params.id, {
        type,
        intensity,
        duration: parseInt(duration, 10),
    });
    res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
    await Workout.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.get('/progress', async (req, res) => {
    const now = new Date();
    const pastWeek = new Date(now);
    pastWeek.setDate(now.getDate() - 7);
    const count = await Workout.countDocuments({
        date: { $gte: pastWeek }
    });
    res.render('progress', { count });
});

module.exports = router;
